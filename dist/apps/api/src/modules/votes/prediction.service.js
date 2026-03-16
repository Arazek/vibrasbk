"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/entities/user.entity");
const intention_vote_entity_1 = require("./entities/intention-vote.entity");
const NIVEL_WEIGHT = {
    [user_entity_1.Nivel.NUEVO]: 1,
    [user_entity_1.Nivel.INICIACION]: 2,
    [user_entity_1.Nivel.SOCIAL_COMODO]: 3,
    [user_entity_1.Nivel.INTERMEDIO]: 4,
    [user_entity_1.Nivel.AVANZADO]: 5,
};
let PredictionService = class PredictionService {
    // Rule 1 — Weighted estimated attendance
    estimateAttendance(voters) {
        return voters.reduce((score, v) => {
            if (v.estado === intention_vote_entity_1.VoteEstado.VOY)
                return score + 1.0 * v.fiabilidad;
            if (v.estado === intention_vote_entity_1.VoteEstado.TAL_VEZ)
                return score + 0.4 * v.fiabilidad;
            return score;
        }, 0);
    }
    // Rule 2 — Classify ambiente (uses aforo % when available, absolute thresholds otherwise)
    classifyAmbiente(score, hasVotes, aforoMaximo) {
        if (!hasVotes)
            return 'flojo';
        if (aforoMaximo && aforoMaximo > 0) {
            const pct = score / aforoMaximo;
            if (pct < 0.25)
                return 'flojo';
            if (pct < 0.50)
                return 'normal';
            if (pct < 0.80)
                return 'animado';
            return 'muy_lleno';
        }
        if (score < 9)
            return 'flojo';
        if (score < 19)
            return 'normal';
        if (score < 36)
            return 'animado';
        return 'muy_lleno';
    }
    // Rule 3 — Role balance with percentages
    getRoleBalance(voters) {
        const interested = voters.filter((v) => v.estado === intention_vote_entity_1.VoteEstado.VOY || v.estado === intention_vote_entity_1.VoteEstado.TAL_VEZ);
        const total = interested.length;
        if (total === 0) {
            return { leadersPercent: 0, followersPercent: 0, switchesPercent: 0, balance: 'equilibrado' };
        }
        const leaders = interested.filter((v) => v.rol === 'leader').length;
        const followers = interested.filter((v) => v.rol === 'follower').length;
        const leadersPercent = Math.round((leaders / total) * 100);
        const followersPercent = Math.round((followers / total) * 100);
        const switchesPercent = Math.max(0, 100 - leadersPercent - followersPercent);
        const ratio = leaders / Math.max(1, followers);
        let balance = 'equilibrado';
        if (ratio < 0.8)
            balance = 'faltan_leaders';
        else if (ratio > 1.2)
            balance = 'faltan_followers';
        return { leadersPercent, followersPercent, switchesPercent, balance };
    }
    // Rule 4 — Weighted average level
    getNivelMedio(voters) {
        const interested = voters.filter((v) => v.estado === intention_vote_entity_1.VoteEstado.VOY || v.estado === intention_vote_entity_1.VoteEstado.TAL_VEZ);
        if (interested.length === 0)
            return 0;
        const weightedSum = interested.reduce((sum, v) => sum + NIVEL_WEIGHT[v.nivel] * v.fiabilidad, 0);
        const totalWeight = interested.reduce((sum, v) => sum + v.fiabilidad, 0);
        return totalWeight > 0 ? weightedSum / totalWeight : 0;
    }
    // Nivel distribution as percentages (0–100)
    getNivelDistribution(voters) {
        const interested = voters.filter((v) => v.estado === intention_vote_entity_1.VoteEstado.VOY || v.estado === intention_vote_entity_1.VoteEstado.TAL_VEZ);
        const counts = {
            [user_entity_1.Nivel.NUEVO]: 0,
            [user_entity_1.Nivel.INICIACION]: 0,
            [user_entity_1.Nivel.SOCIAL_COMODO]: 0,
            [user_entity_1.Nivel.INTERMEDIO]: 0,
            [user_entity_1.Nivel.AVANZADO]: 0,
        };
        interested.forEach((v) => counts[v.nivel]++);
        const total = interested.length;
        if (total === 0)
            return counts;
        return {
            [user_entity_1.Nivel.NUEVO]: Math.round((counts[user_entity_1.Nivel.NUEVO] / total) * 100),
            [user_entity_1.Nivel.INICIACION]: Math.round((counts[user_entity_1.Nivel.INICIACION] / total) * 100),
            [user_entity_1.Nivel.SOCIAL_COMODO]: Math.round((counts[user_entity_1.Nivel.SOCIAL_COMODO] / total) * 100),
            [user_entity_1.Nivel.INTERMEDIO]: Math.round((counts[user_entity_1.Nivel.INTERMEDIO] / total) * 100),
            [user_entity_1.Nivel.AVANZADO]: Math.round((counts[user_entity_1.Nivel.AVANZADO] / total) * 100),
        };
    }
    // Recommendation text based on combined rules
    getRecommendation(ambiente, nivelMedio, balance) {
        if (ambiente === 'flojo')
            return 'Poca gente de momento.';
        if (nivelMedio >= 4)
            return 'Exigente para principiantes.';
        if (balance === 'faltan_followers')
            return 'Puede haber espera para followers.';
        if (balance === 'faltan_leaders')
            return 'Puede haber espera para leaders.';
        if (ambiente === 'animado' || ambiente === 'muy_lleno')
            return 'Noche animada, ¡buena opción!';
        return 'Buen día para practicar.';
    }
    // Compose full prediction from voter data
    predict(voters, aforoMaximo) {
        const hasVotes = voters.some((v) => v.estado === intention_vote_entity_1.VoteEstado.VOY || v.estado === intention_vote_entity_1.VoteEstado.TAL_VEZ);
        const asistenciaEstimada = this.estimateAttendance(voters);
        const ambiente = this.classifyAmbiente(asistenciaEstimada, hasVotes, aforoMaximo);
        const nivelDistribution = this.getNivelDistribution(voters);
        const roleBalance = this.getRoleBalance(voters);
        const nivelMedio = this.getNivelMedio(voters);
        const recommendation = this.getRecommendation(ambiente, nivelMedio, roleBalance.balance);
        const result = {
            ambiente,
            asistenciaEstimada,
            nivelDistribution,
            roleBalance,
            recommendation,
        };
        if (aforoMaximo) {
            result.aforoMaximo = aforoMaximo;
            result.aforoOcupacionPct = Math.round((asistenciaEstimada / aforoMaximo) * 100);
        }
        return result;
    }
};
exports.PredictionService = PredictionService;
exports.PredictionService = PredictionService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PredictionService);
//# sourceMappingURL=prediction.service.js.map