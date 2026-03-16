"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademiasService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const academia_entity_1 = require("./entities/academia.entity");
let AcademiasService = class AcademiasService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({ order: { nombre: 'ASC' } });
    }
    findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(dto) {
        return this.repo.save(this.repo.create(dto));
    }
    async update(id, dto) {
        const academia = await this.repo.findOne({ where: { id } });
        if (!academia)
            throw new common_1.NotFoundException(`Academia ${id} no encontrada`);
        Object.assign(academia, dto);
        return this.repo.save(academia);
    }
    async remove(id) {
        const academia = await this.repo.findOne({ where: { id } });
        if (!academia)
            throw new common_1.NotFoundException(`Academia ${id} no encontrada`);
        await this.repo.remove(academia);
    }
};
exports.AcademiasService = AcademiasService;
exports.AcademiasService = AcademiasService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(academia_entity_1.Academia)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], AcademiasService);
//# sourceMappingURL=academias.service.js.map