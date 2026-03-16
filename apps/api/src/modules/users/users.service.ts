import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  findByAlias(alias: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { alias } });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, dto);
    return this.findById(id) as Promise<User>;
  }
}
