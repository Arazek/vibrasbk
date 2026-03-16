import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<AuthResponseDto>;
    login(body: {
        alias: string;
    }): Promise<AuthResponseDto>;
}
//# sourceMappingURL=auth.controller.d.ts.map