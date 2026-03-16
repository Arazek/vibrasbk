import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dtos/register.dto';
export interface AuthResponseData {
    accessToken: string;
    user: {
        id: string;
        alias: string;
        ciudad: string;
        rol: string;
        nivel: string;
        estilos: string[];
        academiaId?: string;
        createdAt: Date;
        updatedAt: Date;
    };
}
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<AuthResponseData>;
    login(alias: string): Promise<AuthResponseData>;
    private signToken;
}
//# sourceMappingURL=auth.service.d.ts.map