"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanceStylesService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const dance_style_entity_1 = require("./entities/dance-style.entity");
const SEED_STYLES = [
    { slug: 'bachata_sensual', nombre: 'Bachata Sensual' },
    { slug: 'bachata_tradicional', nombre: 'Bachata Tradicional' },
    { slug: 'salsa_linea', nombre: 'Salsa en Línea' },
    { slug: 'salsa_cubana', nombre: 'Salsa Cubana' },
];
let DanceStylesService = class DanceStylesService {
    constructor(repo) {
        this.repo = repo;
    }
    async onApplicationBootstrap() {
        const count = await this.repo.count();
        if (count === 0) {
            await this.repo.save(SEED_STYLES.map((s) => this.repo.create(s)));
        }
    }
    findAll() {
        return this.repo.find({ where: { activo: true }, order: { nombre: 'ASC' } });
    }
    findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(dto) {
        return this.repo.save(this.repo.create({ ...dto, activo: dto.activo ?? true }));
    }
    async update(id, dto) {
        const style = await this.repo.findOne({ where: { id } });
        if (!style)
            throw new common_1.NotFoundException(`Estilo ${id} no encontrado`);
        Object.assign(style, dto);
        return this.repo.save(style);
    }
    async remove(id) {
        const style = await this.repo.findOne({ where: { id } });
        if (!style)
            throw new common_1.NotFoundException(`Estilo ${id} no encontrado`);
        await this.repo.remove(style);
    }
};
exports.DanceStylesService = DanceStylesService;
exports.DanceStylesService = DanceStylesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(dance_style_entity_1.DanceStyle)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], DanceStylesService);
//# sourceMappingURL=dance-styles.service.js.map