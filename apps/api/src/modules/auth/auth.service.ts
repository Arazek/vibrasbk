import { Injectable, ConflictException, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, DancingRole, ApplicationRole, Level } from '../users/entities/user.entity';
import { RegisterDto } from './dtos/register.dto';

export interface AuthResponseData {
  accessToken: string;
  user: {
    id: string;
    alias: string;
    city: string;
    dancingRole: string;
    applicationRole: string;
    level: string;
    styles: string[];
    academyId?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseData> {
    const existingAlias = await this.usersRepository.findOne({ where: { alias: dto.alias } });
    if (existingAlias) {
      throw new ConflictException(`Alias "${dto.alias}" is already taken`);
    }
    const existingEmail = await this.usersRepository.findOne({ where: { email: dto.email } });
    if (existingEmail) {
      throw new ConflictException(`Email "${dto.email}" is already registered`);
    }

    const validDancingRoles = Object.values(DancingRole);
    const validLevels = Object.values(Level);

    if (!validDancingRoles.includes(dto.dancingRole as DancingRole)) {
      throw new BadRequestException(`Invalid dancing role: ${dto.dancingRole}`);
    }
    if (!validLevels.includes(dto.level as Level)) {
      throw new BadRequestException(`Invalid level: ${dto.level}`);
    }
    if (!Array.isArray(dto.styles) || dto.styles.length === 0) {
      throw new BadRequestException(`At least one style is required`);
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.usersRepository.create({
      alias: dto.alias,
      email: dto.email,
      passwordHash,
      city: 'Cartagena',
      dancingRole: dto.dancingRole as DancingRole,
      applicationRole: ApplicationRole.USER,
      level: dto.level as Level,
      styles: dto.styles,
      academyId: dto.academyId,
    });
    await this.usersRepository.save(user);

    return this.signToken(user);
  }

  async login(email: string, password: string): Promise<AuthResponseData> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    return this.signToken(user);
  }

  private signToken(user: User) {
    const payload = { sub: user.id, alias: user.alias, applicationRole: user.applicationRole };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        alias: user.alias,
        city: user.city,
        dancingRole: user.dancingRole,
        applicationRole: user.applicationRole,
        level: user.level,
        styles: user.styles,
        academyId: user.academyId || undefined,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
