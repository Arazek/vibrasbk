export declare class UserProfileDto {
    id: string;
    alias: string;
    ciudad: string;
    rol: string;
    nivel: string;
    estilos: string[];
    academia?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class AuthResponseDto {
    accessToken: string;
    user: UserProfileDto;
}
//# sourceMappingURL=auth-response.dto.d.ts.map