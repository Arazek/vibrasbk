import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friendship, FriendshipStatus } from './entities/friendship.entity';
import { User } from '../users/entities/user.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { SendFriendRequestDto } from './dtos/send-request.dto';
import { RespondFriendRequestDto } from './dtos/respond-request.dto';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepo: Repository<Friendship>,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private notificationsService: NotificationsService,
  ) {}

  async sendRequest(
    currentUserId: string,
    dto: SendFriendRequestDto,
  ): Promise<Friendship> {
    const identifier = dto.identifier.trim();

    // Find target user by exact alias or email
    const where =
      dto.identifierType === 'alias'
        ? { alias: identifier }
        : { email: identifier };

    const addressee = await this.usersRepo.findOne({ where });
    if (!addressee) {
      throw new NotFoundException('User not found');
    }

    if (addressee.id === currentUserId) {
      throw new ConflictException('Cannot send a friend request to yourself');
    }

    // Check if any friendship record already exists in either direction
    const existing = await this.friendshipRepo
      .createQueryBuilder('f')
      .where(
        '(f.requesterId = :a AND f.addresseeId = :b) OR (f.requesterId = :b AND f.addresseeId = :a)',
        { a: currentUserId, b: addressee.id },
      )
      .getOne();

    if (existing) {
      if (existing.status === FriendshipStatus.ACCEPTED) {
        throw new ConflictException('Already friends');
      }
      throw new ConflictException('Friend request already exists');
    }

    const requester = await this.usersRepo.findOne({ where: { id: currentUserId } });

    const friendship = this.friendshipRepo.create({
      requesterId: currentUserId,
      addresseeId: addressee.id,
      status: FriendshipStatus.PENDING,
    });
    const saved = await this.friendshipRepo.save(friendship);

    // Send FCM push notification if addressee has a token
    if (addressee.fcmToken && requester) {
      this.notificationsService
        .sendPushNotification(
          addressee.fcmToken,
          'Nueva solicitud de amistad',
          `${requester.alias} quiere conectar contigo`,
          { type: 'friend_request', senderId: currentUserId, friendshipId: saved.id },
        )
        .catch(() => { /* non-blocking */ });
    }

    return saved;
  }

  async respondToRequest(
    currentUserId: string,
    friendshipId: string,
    dto: RespondFriendRequestDto,
  ): Promise<Friendship> {
    const friendship = await this.friendshipRepo.findOne({
      where: { id: friendshipId },
    });

    if (!friendship) {
      throw new NotFoundException('Friend request not found');
    }

    if (friendship.addresseeId !== currentUserId) {
      throw new ForbiddenException('Only the addressee can respond to this request');
    }

    if (friendship.status !== FriendshipStatus.PENDING) {
      throw new ConflictException('Request has already been responded to');
    }

    friendship.status =
      dto.action === 'accept'
        ? FriendshipStatus.ACCEPTED
        : FriendshipStatus.REJECTED;

    return this.friendshipRepo.save(friendship);
  }

  async getFriends(currentUserId: string): Promise<any[]> {
    const friendships = await this.friendshipRepo
      .createQueryBuilder('f')
      .leftJoinAndSelect('f.requester', 'requester')
      .leftJoinAndSelect('requester.country', 'rCountry')
      .leftJoinAndSelect('requester.city', 'rCity')
      .leftJoinAndSelect('f.addressee', 'addressee')
      .leftJoinAndSelect('addressee.country', 'aCountry')
      .leftJoinAndSelect('addressee.city', 'aCity')
      .where('f.status = :status', { status: FriendshipStatus.ACCEPTED })
      .andWhere(
        '(f.requesterId = :uid OR f.addresseeId = :uid)',
        { uid: currentUserId },
      )
      .getMany();

    return friendships.map((f) => {
      const other = f.requesterId === currentUserId ? f.addressee : f.requester;
      return {
        friendshipId: f.id,
        since: f.updatedAt,
        user: {
          id: other.id,
          alias: other.alias,
          photoUrl: other.photoUrl,
          dancingRole: other.dancingRole,
          level: other.level,
          country: other.country ?? null,
          city: other.city ?? null,
        },
      };
    });
  }

  async getPendingReceived(currentUserId: string): Promise<any[]> {
    const friendships = await this.friendshipRepo.find({
      where: { addresseeId: currentUserId, status: FriendshipStatus.PENDING },
      relations: ['requester', 'requester.country', 'requester.city'],
      order: { createdAt: 'DESC' },
    });

    return friendships.map((f) => ({
      id: f.id,
      status: f.status,
      createdAt: f.createdAt,
      requester: {
        id: f.requester.id,
        alias: f.requester.alias,
        photoUrl: f.requester.photoUrl,
        dancingRole: f.requester.dancingRole,
        level: f.requester.level,
      },
    }));
  }

  async getSentPending(currentUserId: string): Promise<any[]> {
    const friendships = await this.friendshipRepo.find({
      where: { requesterId: currentUserId, status: FriendshipStatus.PENDING },
      relations: ['addressee'],
      order: { createdAt: 'DESC' },
    });

    return friendships.map((f) => ({
      id: f.id,
      status: f.status,
      createdAt: f.createdAt,
      addressee: {
        id: f.addressee.id,
        alias: f.addressee.alias,
        photoUrl: f.addressee.photoUrl,
        dancingRole: f.addressee.dancingRole,
        level: f.addressee.level,
      },
    }));
  }

  async getPendingCount(currentUserId: string): Promise<number> {
    return this.friendshipRepo.count({
      where: { addresseeId: currentUserId, status: FriendshipStatus.PENDING },
    });
  }

  async removeFriend(currentUserId: string, friendshipId: string): Promise<void> {
    const friendship = await this.friendshipRepo.findOne({
      where: { id: friendshipId },
    });

    if (!friendship) {
      throw new NotFoundException('Friendship not found');
    }

    if (
      friendship.requesterId !== currentUserId &&
      friendship.addresseeId !== currentUserId
    ) {
      throw new ForbiddenException('Not your friendship to remove');
    }

    await this.friendshipRepo.remove(friendship);
  }
}
