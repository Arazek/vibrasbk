import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findById(id: string): Promise<User | null>;
    findByAlias(alias: string): Promise<User | null>;
    update(id: string, dto: UpdateUserDto): Promise<User>;
}
//# sourceMappingURL=users.service.d.ts.map