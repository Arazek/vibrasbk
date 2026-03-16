"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotesService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const intention_vote_entity_1 = require("./entities/intention-vote.entity");
const attendance_verification_entity_1 = require("./entities/attendance-verification.entity");
const reliability_metric_entity_1 = require("./entities/reliability-metric.entity");
const recurring_event_entity_1 = require("../events/entities/recurring-event.entity");
const user_entity_1 = require("../users/entities/user.entity");
const prediction_service_1 = require("./prediction.service");
const events_service_1 = require("../events/events.service");
let VotesService = class VotesService {
    constructor(votesRepo, verificationsRepo, reliabilityRepo, eventsRepo, usersRepo, predictionService) {
        this.votesRepo = votesRepo;
        this.verificationsRepo = verificationsRepo;
        this.reliabilityRepo = reliabilityRepo;
        this.eventsRepo = eventsRepo;
        this.usersRepo = usersRepo;
        this.predictionService = predictionService;
    }
    // ─── Casting & updating votes ─────────────────────────────────────────────
    async castVote(userId, dto) {
        const semanaIso = (0, events_service_1.toIsoWeek)(new Date());
        const existing = await this.votesRepo.findOne({
            where: { userId, eventId: dto.eventId, semanaIso },
        });
        if (existing) {
            throw new common_1.ConflictException('Ya has votado para este evento esta semana. Usa PATCH para cambiar.');
        }
        const vote = this.votesRepo.create({
            userId,
            eventId: dto.eventId,
            semanaIso,
            estado: dto.estado,
        });
        return this.votesRepo.save(vote);
    }
    async updateVote(userId, voteId, dto) {
        const vote = await this.votesRepo.findOne({ where: { id: voteId } });
        if (!vote)
            throw new common_1.NotFoundException('Voto no encontrado.');
        if (vote.userId !== userId)
            throw new common_1.ForbiddenException('No puedes modificar este voto.');
        const canEdit = await this.canEditVote(vote.eventId);
        if (!canEdit) {
            throw new common_1.ForbiddenException('No se puede cambiar el voto menos de 2 horas antes del evento.');
        }
        vote.estado = dto.estado;
        return this.votesRepo.save(vote);
    }
    async canEditVote(eventId) {
        const event = await this.eventsRepo.findOne({ where: { id: eventId } });
        if (!event)
            return false;
        if (event.diaSemana == null || !event.horaInicio)
            return true;
        const eventStart = (0, events_service_1.projectToCurrentWeek)(event.diaSemana, event.horaInicio);
        const twoHoursBefore = new Date(eventStart.getTime() - 2 * 60 * 60 * 1000);
        return new Date() < twoHoursBefore;
    }
    // ─── Aggregates for weekly event list ─────────────────────────────────────
    async getAggregatesForEvents(eventIds, semanaIso, userId, aforoMap) {
        if (eventIds.length === 0)
            return new Map();
        const votes = await this.votesRepo.find({
            where: { eventId: (0, typeorm_2.In)(eventIds), semanaIso },
        });
        const voterIds = [...new Set(votes.map((v) => v.userId))];
        const [users, metrics] = await Promise.all([
            voterIds.length > 0 ? this.usersRepo.find({ where: { id: (0, typeorm_2.In)(voterIds) } }) : [],
            voterIds.length > 0 ? this.reliabilityRepo.find({ where: { userId: (0, typeorm_2.In)(voterIds) } }) : [],
        ]);
        const userMap = new Map(users.map((u) => [u.id, u]));
        const reliabilityMap = new Map(metrics.map((m) => [m.userId, Number(m.fiabilidad)]));
        const result = new Map();
        for (const eventId of eventIds) {
            const eventVotes = votes.filter((v) => v.eventId === eventId);
            const interested = eventVotes.filter((v) => v.estado === intention_vote_entity_1.VoteEstado.VOY || v.estado === intention_vote_entity_1.VoteEstado.TAL_VEZ);
            const userVoteRecord = eventVotes.find((v) => v.userId === userId) ?? null;
            const userVote = userVoteRecord?.estado ?? null;
            const userVoteId = userVoteRecord?.id ?? null;
            const voterData = eventVotes
                .map((v) => {
                const user = userMap.get(v.userId);
                if (!user)
                    return null;
                return {
                    userId: v.userId,
                    estado: v.estado,
                    rol: user.rol,
                    nivel: user.nivel,
                    fiabilidad: reliabilityMap.get(v.userId) ?? 1.0,
                };
            })
                .filter((v) => v !== null);
            const aforo = aforoMap?.get(eventId);
            const score = this.predictionService.estimateAttendance(voterData);
            const ambienteColor = this.predictionService.classifyAmbiente(score, interested.length > 0, aforo);
            const roleBalance = this.predictionService.getRoleBalance(voterData);
            result.set(eventId, {
                totalInteresados: interested.length,
                voyCount: eventVotes.filter((v) => v.estado === intention_vote_entity_1.VoteEstado.VOY).length,
                talVezCount: eventVotes.filter((v) => v.estado === intention_vote_entity_1.VoteEstado.TAL_VEZ).length,
                userVote,
                userVoteId,
                ambienteColor,
                roleBalance,
            });
        }
        return result;
    }
    // ─── Full analytics (gated: user must have voted voy/tal_vez) ─────────────
    async getAnalytics(eventId, userId) {
        const semanaIso = (0, events_service_1.toIsoWeek)(new Date());
        const userVote = await this.votesRepo.findOne({
            where: { userId, eventId, semanaIso },
        });
        if (!userVote || userVote.estado === intention_vote_entity_1.VoteEstado.NO_VOY) {
            throw new common_1.UnauthorizedException('Debes votar "Voy" o "Tal vez" para ver la analítica.');
        }
        // Load event to get venue aforo
        const event = await this.eventsRepo.findOne({ where: { id: eventId } });
        const aforoMaximo = event?.venue?.aforoMaximo ?? undefined;
        const votes = await this.votesRepo.find({ where: { eventId, semanaIso } });
        const voterIds = [...new Set(votes.map((v) => v.userId))];
        const [users, metrics] = await Promise.all([
            voterIds.length > 0 ? this.usersRepo.find({ where: { id: (0, typeorm_2.In)(voterIds) } }) : [],
            voterIds.length > 0 ? this.reliabilityRepo.find({ where: { userId: (0, typeorm_2.In)(voterIds) } }) : [],
        ]);
        const userMap = new Map(users.map((u) => [u.id, u]));
        const reliabilityMap = new Map(metrics.map((m) => [m.userId, Number(m.fiabilidad)]));
        const voterData = votes
            .map((v) => {
            const user = userMap.get(v.userId);
            if (!user)
                return null;
            return {
                userId: v.userId,
                estado: v.estado,
                rol: user.rol,
                nivel: user.nivel,
                fiabilidad: reliabilityMap.get(v.userId) ?? 1.0,
            };
        })
            .filter((v) => v !== null);
        return this.predictionService.predict(voterData, aforoMaximo);
    }
    // ─── Attendance verification ───────────────────────────────────────────────
    async verifyAttendance(userId, dto) {
        const existing = await this.verificationsRepo.findOne({
            where: { userId, eventId: dto.eventId, semanaIso: dto.semanaIso },
        });
        if (existing) {
            existing.asistio = dto.asistio;
            existing.timestampRespuesta = new Date();
            const saved = await this.verificationsRepo.save(existing);
            await this.updateReliability(userId, dto.asistio);
            return saved;
        }
        const verification = this.verificationsRepo.create({
            userId,
            eventId: dto.eventId,
            semanaIso: dto.semanaIso,
            asistio: dto.asistio,
            timestampRespuesta: new Date(),
        });
        const saved = await this.verificationsRepo.save(verification);
        await this.updateReliability(userId, dto.asistio);
        return saved;
    }
    // ─── Reliability update (called after verification) ───────────────────────
    async updateReliability(userId, asistio) {
        let metric = await this.reliabilityRepo.findOne({ where: { userId } });
        if (!metric) {
            metric = this.reliabilityRepo.create({ userId, votosVoyTotal: 0, asistenciasConfirmadas: 0, fiabilidad: 1.0 });
        }
        metric.votosVoyTotal += 1;
        if (asistio)
            metric.asistenciasConfirmadas += 1;
        metric.fiabilidad = metric.asistenciasConfirmadas / Math.max(1, metric.votosVoyTotal);
        await this.reliabilityRepo.save(metric);
    }
    // ─── Used by scheduler ────────────────────────────────────────────────────
    async getPendingVerifications(cutoffDate) {
        return this.verificationsRepo
            .createQueryBuilder('v')
            .where('v.asistio IS NULL')
            .andWhere('v.createdAt < :cutoff', { cutoff: cutoffDate })
            .getMany();
    }
    async closeVerification(verificationId) {
        await this.verificationsRepo.update(verificationId, {
            asistio: false,
            timestampRespuesta: new Date(),
        });
    }
    async createPendingVerificationsForYesterday() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const semanaIso = (0, events_service_1.toIsoWeek)(yesterday);
        const dayOfWeek = yesterday.getDay() === 0 ? 6 : yesterday.getDay() - 1; // 0=Mon
        const events = await this.eventsRepo.find({
            where: { diaSemana: dayOfWeek, activo: true },
        });
        for (const event of events) {
            const voyVotes = await this.votesRepo.find({
                where: { eventId: event.id, semanaIso, estado: intention_vote_entity_1.VoteEstado.VOY },
            });
            for (const vote of voyVotes) {
                const exists = await this.verificationsRepo.findOne({
                    where: { userId: vote.userId, eventId: event.id, semanaIso },
                });
                if (!exists) {
                    await this.verificationsRepo.save(this.verificationsRepo.create({
                        userId: vote.userId,
                        eventId: event.id,
                        semanaIso,
                        asistio: null,
                    }));
                }
            }
        }
    }
    async getVoyVotersForYesterday() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const semanaIso = (0, events_service_1.toIsoWeek)(yesterday);
        const dayOfWeek = yesterday.getDay() === 0 ? 6 : yesterday.getDay() - 1;
        const events = await this.eventsRepo.find({
            where: { diaSemana: dayOfWeek, activo: true },
        });
        const result = [];
        for (const event of events) {
            const voyVotes = await this.votesRepo.find({
                where: { eventId: event.id, semanaIso, estado: intention_vote_entity_1.VoteEstado.VOY },
            });
            for (const vote of voyVotes) {
                result.push({ userId: vote.userId, eventName: event.venue?.nombre ?? event.id });
            }
        }
        return result;
    }
};
exports.VotesService = VotesService;
exports.VotesService = VotesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(intention_vote_entity_1.IntentionVote)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(attendance_verification_entity_1.AttendanceVerification)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(reliability_metric_entity_1.ReliabilityMetric)),
    tslib_1.__param(3, (0, typeorm_1.InjectRepository)(recurring_event_entity_1.RecurringEvent)),
    tslib_1.__param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        prediction_service_1.PredictionService])
], VotesService);
//# sourceMappingURL=votes.service.js.map