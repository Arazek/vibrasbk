"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existing = await this.usersRepository.findOne({ where: { alias: dto.alias } });
        if (existing) {
            throw new common_1.ConflictException(`Alias "${dto.alias}" is already taken`);
        }
        // Validate enum values
        const validRoles = Object.values(user_entity_1.Rol);
        const validNiveles = Object.values(user_entity_1.Nivel);
        if (!validRoles.includes(dto.rol)) {
            throw new common_1.BadRequestException(`Invalid rol: ${dto.rol}`);
        }
        if (!validNiveles.includes(dto.nivel)) {
            throw new common_1.BadRequestException(`Invalid nivel: ${dto.nivel}`);
        }
        if (!Array.isArray(dto.estilos) || dto.estilos.length === 0) {
            throw new common_1.BadRequestException(`Se requiere al menos un estilo`);
        }
        const user = this.usersRepository.create({
            alias: dto.alias,
            ciudad: 'Cartagena',
            rol: dto.rol,
            nivel: dto.nivel,
            estilos: dto.estilos,
            academiaId: dto.academiaId,
        });
        await this.usersRepository.save(user);
        return this.signToken(user);
    }
    async login(alias) {
        const user = await this.usersRepository.findOne({ where: { alias } });
        if (!user) {
            throw new common_1.NotFoundException(`No user found with alias "${alias}"`);
        }
        return this.signToken(user);
    }
    signToken(user) {
        const payload = { sub: user.id, alias: user.alias, rol: user.rol };
        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                alias: user.alias,
                ciudad: user.ciudad,
                rol: user.rol,
                nivel: user.nivel,
                estilos: user.estilos,
                academiaId: user.academiaId || undefined,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map