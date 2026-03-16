import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<import("./entities/user.entity").User | null>;
    updateProfile(req: any, dto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
}
//# sourceMappingURL=users.controller.d.ts.map