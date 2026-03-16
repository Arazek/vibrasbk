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
export declare class PredictionService {
    estimateAttendance(voters: VoterData[]): number;
    classifyAmbiente(score: number, hasVotes: boolean, aforoMaximo?: number): Ambiente;
    getRoleBalance(voters: VoterData[]): RoleBalanceDetail;
    getNivelMedio(voters: VoterData[]): number;
    getNivelDistribution(voters: VoterData[]): Record<Nivel, number>;
    getRecommendation(ambiente: Ambiente, nivelMedio: number, balance: RoleBalanceDetail['balance']): string;
    predict(voters: VoterData[], aforoMaximo?: number): PredictionResult;
}
//# sourceMappingURL=prediction.service.d.ts.map