"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenuesService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const venue_entity_1 = require("./entities/venue.entity");
const SEED_VENUES = [
    { nombre: 'Alma', ciudad: 'Cartagena', lat: 10.391, lng: -75.479, aforoMaximo: 80, estilos: ['salsa_cubana', 'bachata_sensual'] },
    { nombre: 'El Almacén', ciudad: 'Cartagena', lat: 10.4, lng: -75.497, aforoMaximo: 120, estilos: ['salsa_linea', 'salsa_cubana'] },
    { nombre: 'El Musical', ciudad: 'Cartagena', lat: 10.396, lng: -75.484, aforoMaximo: 100, estilos: ['bachata_tradicional', 'salsa_cubana'] },
    { nombre: 'Bondi', ciudad: 'Cartagena', lat: 10.388, lng: -75.475, aforoMaximo: 60, estilos: ['bachata_sensual', 'bachata_tradicional'] },
    { nombre: 'Cabaña', ciudad: 'Cartagena', lat: 10.402, lng: -75.502, aforoMaximo: 90, estilos: ['salsa_linea', 'bachata_sensual'] },
    { nombre: 'Blanco y Negro', ciudad: 'Cartagena', lat: 10.393, lng: -75.481, aforoMaximo: 150, estilos: ['salsa_cubana', 'salsa_linea'] },
];
let VenuesService = class VenuesService {
    constructor(venuesRepository) {
        this.venuesRepository = venuesRepository;
    }
    async onApplicationBootstrap() {
        const count = await this.venuesRepository.count();
        if (count === 0) {
            await this.venuesRepository.save(SEED_VENUES.map((v) => this.venuesRepository.create(v)));
        }
    }
    findAll() {
        return this.venuesRepository.find();
    }
    findOne(id) {
        return this.venuesRepository.findOne({ where: { id } });
    }
    async create(dto) {
        const venue = this.venuesRepository.create({
            nombre: dto.nombre,
            ciudad: dto.ciudad ?? 'Cartagena',
            lat: dto.lat,
            lng: dto.lng,
            aforoMaximo: dto.aforoMaximo,
            estilos: dto.estilos ?? [],
        });
        return this.venuesRepository.save(venue);
    }
    async update(id, dto) {
        const venue = await this.venuesRepository.findOne({ where: { id } });
        if (!venue)
            throw new common_1.NotFoundException(`Venue ${id} no encontrado.`);
        Object.assign(venue, dto);
        return this.venuesRepository.save(venue);
    }
    async remove(id) {
        const venue = await this.venuesRepository.findOne({ where: { id } });
        if (!venue)
            throw new common_1.NotFoundException(`Venue ${id} no encontrado.`);
        await this.venuesRepository.remove(venue);
    }
};
exports.VenuesService = VenuesService;
exports.VenuesService = VenuesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(venue_entity_1.Venue)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], VenuesService);
//# sourceMappingURL=venues.service.js.map