import { Injectable } from '@nestjs/common';
import { Nivel } from '../users/entities/user.entity';
import { VoteEstado } from './entities/intention-vote.entity';

export type Ambiente = 'flojo' | 'normal' | 'animado' | 'muy_lleno';

export interface RoleBalanceDetail {
  leadersPercent: number;
  followersPercent: number;
  switchesPercent: number;
  balance: 'equilibrado' | 'faltan_leaders' | 'faltan_followers';
}

export interface VoterData {
  userId: string;
  estado: VoteEstado;
  rol: 'leader' | 'follower' | 'switch';
  nivel: Nivel;
  fiabilidad: number;
}

export interface PredictionResult {
  ambiente: Ambiente;
  asistenciaEstimada: number;
  aforoMaximo?: number;
  aforoOcupacionPct?: number;
  nivelDistribution: Record<Nivel, number>;
  roleBalance: RoleBalanceDetail;
  recommendation: string;
}

const NIVEL_WEIGHT: Record<Nivel, number> = {
  [Nivel.NUEVO]: 1,
  [Nivel.INICIACION]: 2,
  [Nivel.SOCIAL_COMODO]: 3,
  [Nivel.INTERMEDIO]: 4,
  [Nivel.AVANZADO]: 5,
};

@Injectable()
export class PredictionService {
  // Rule 1 — Weighted estimated attendance
  estimateAttendance(voters: VoterData[]): number {
    return voters.reduce((score, v) => {
      if (v.estado === VoteEstado.VOY) return score + 1.0 * v.fiabilidad;
      if (v.estado === VoteEstado.TAL_VEZ) return score + 0.4 * v.fiabilidad;
      return score;
    }, 0);
  }

  // Rule 2 — Classify ambiente (uses aforo % when available, absolute thresholds otherwise)
  classifyAmbiente(score: number, hasVotes: boolean, aforoMaximo?: number): Ambiente {
    if (!hasVotes) return 'flojo';
    if (aforoMaximo && aforoMaximo > 0) {
      const pct = score / aforoMaximo;
      if (pct < 0.25) return 'flojo';
      if (pct < 0.50) return 'normal';
      if (pct < 0.80) return 'animado';
      return 'muy_lleno';
    }
    if (score < 9) return 'flojo';
    if (score < 19) return 'normal';
    if (score < 36) return 'animado';
    return 'muy_lleno';
  }

  // Rule 3 — Role balance with percentages
  getRoleBalance(voters: VoterData[]): RoleBalanceDetail {
    const interested = voters.filter(
      (v) => v.estado === VoteEstado.VOY || v.estado === VoteEstado.TAL_VEZ
    );
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
    let balance: RoleBalanceDetail['balance'] = 'equilibrado';
    if (ratio < 0.8) balance = 'faltan_leaders';
    else if (ratio > 1.2) balance = 'faltan_followers';

    return { leadersPercent, followersPercent, switchesPercent, balance };
  }

  // Rule 4 — Weighted average level
  getNivelMedio(voters: VoterData[]): number {
    const interested = voters.filter(
      (v) => v.estado === VoteEstado.VOY || v.estado === VoteEstado.TAL_VEZ
    );
    if (interested.length === 0) return 0;
    const weightedSum = interested.reduce(
      (sum, v) => sum + NIVEL_WEIGHT[v.nivel] * v.fiabilidad,
      0
    );
    const totalWeight = interested.reduce((sum, v) => sum + v.fiabilidad, 0);
    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  }

  // Nivel distribution as percentages (0–100)
  getNivelDistribution(voters: VoterData[]): Record<Nivel, number> {
    const interested = voters.filter(
      (v) => v.estado === VoteEstado.VOY || v.estado === VoteEstado.TAL_VEZ
    );
    const counts: Record<Nivel, number> = {
      [Nivel.NUEVO]: 0,
      [Nivel.INICIACION]: 0,
      [Nivel.SOCIAL_COMODO]: 0,
      [Nivel.INTERMEDIO]: 0,
      [Nivel.AVANZADO]: 0,
    };
    interested.forEach((v) => counts[v.nivel]++);
    const total = interested.length;
    if (total === 0) return counts;
    return {
      [Nivel.NUEVO]: Math.round((counts[Nivel.NUEVO] / total) * 100),
      [Nivel.INICIACION]: Math.round((counts[Nivel.INICIACION] / total) * 100),
      [Nivel.SOCIAL_COMODO]: Math.round((counts[Nivel.SOCIAL_COMODO] / total) * 100),
      [Nivel.INTERMEDIO]: Math.round((counts[Nivel.INTERMEDIO] / total) * 100),
      [Nivel.AVANZADO]: Math.round((counts[Nivel.AVANZADO] / total) * 100),
    };
  }

  // Recommendation text based on combined rules
  getRecommendation(ambiente: Ambiente, nivelMedio: number, balance: RoleBalanceDetail['balance']): string {
    if (ambiente === 'flojo') return 'Poca gente de momento.';
    if (nivelMedio >= 4) return 'Exigente para principiantes.';
    if (balance === 'faltan_followers') return 'Puede haber espera para followers.';
    if (balance === 'faltan_leaders') return 'Puede haber espera para leaders.';
    if (ambiente === 'animado' || ambiente === 'muy_lleno') return 'Noche animada, ¡buena opción!';
    return 'Buen día para practicar.';
  }

  // Compose full prediction from voter data
  predict(voters: VoterData[], aforoMaximo?: number): PredictionResult {
    const hasVotes = voters.some(
      (v) => v.estado === VoteEstado.VOY || v.estado === VoteEstado.TAL_VEZ
    );
    const asistenciaEstimada = this.estimateAttendance(voters);
    const ambiente = this.classifyAmbiente(asistenciaEstimada, hasVotes, aforoMaximo);
    const nivelDistribution = this.getNivelDistribution(voters);
    const roleBalance = this.getRoleBalance(voters);
    const nivelMedio = this.getNivelMedio(voters);
    const recommendation = this.getRecommendation(ambiente, nivelMedio, roleBalance.balance);

    const result: PredictionResult = {
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
}
