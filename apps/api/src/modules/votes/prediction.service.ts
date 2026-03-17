import { Injectable } from '@nestjs/common';
import { Level } from '../users/entities/user.entity';
import { VoteStatus } from './entities/intention-vote.entity';

export type Vibe = 'quiet' | 'normal' | 'lively' | 'packed';

export interface RoleBalanceDetail {
  leadersPercent: number;
  followersPercent: number;
  switchesPercent: number;
  balance: 'balanced' | 'need_leaders' | 'need_followers';
}

export interface VoterData {
  userId: string;
  status: VoteStatus;
  role: 'leader' | 'follower' | 'switch';
  level: Level;
  reliability: number;
}

export interface PredictionResult {
  vibe: Vibe;
  estimatedAttendance: number;
  maxCapacity?: number;
  capacityOccupancyPct?: number;
  levelDistribution: Record<Level, number>;
  roleBalance: RoleBalanceDetail;
  recommendation: string;
}

const LEVEL_WEIGHT: Record<Level, number> = {
  [Level.BEGINNER]: 1,
  [Level.INITIATION]: 2,
  [Level.COMFORTABLE]: 3,
  [Level.INTERMEDIATE]: 4,
  [Level.ADVANCED]: 5,
};

@Injectable()
export class PredictionService {
  // Rule 1 — Weighted estimated attendance
  estimateAttendance(voters: VoterData[]): number {
    return voters.reduce((score, v) => {
      if (v.status === VoteStatus.GOING) return score + 1.0 * v.reliability;
      if (v.status === VoteStatus.MAYBE) return score + 0.4 * v.reliability;
      return score;
    }, 0);
  }

  // Rule 2 — Classify vibe (uses capacity % when available, absolute thresholds otherwise)
  classifyVibe(score: number, hasVotes: boolean, maxCapacity?: number): Vibe {
    if (!hasVotes) return 'quiet';
    if (maxCapacity && maxCapacity > 0) {
      const pct = score / maxCapacity;
      if (pct < 0.25) return 'quiet';
      if (pct < 0.50) return 'normal';
      if (pct < 0.80) return 'lively';
      return 'packed';
    }
    if (score < 9) return 'quiet';
    if (score < 19) return 'normal';
    if (score < 36) return 'lively';
    return 'packed';
  }

  // Rule 3 — Role balance with percentages
  getRoleBalance(voters: VoterData[]): RoleBalanceDetail {
    const interested = voters.filter(
      (v) => v.status === VoteStatus.GOING || v.status === VoteStatus.MAYBE
    );
    const total = interested.length;
    if (total === 0) {
      return { leadersPercent: 0, followersPercent: 0, switchesPercent: 0, balance: 'balanced' };
    }
    const leaders = interested.filter((v) => v.role === 'leader').length;
    const followers = interested.filter((v) => v.role === 'follower').length;

    const leadersPercent = Math.round((leaders / total) * 100);
    const followersPercent = Math.round((followers / total) * 100);
    const switchesPercent = Math.max(0, 100 - leadersPercent - followersPercent);

    const ratio = leaders / Math.max(1, followers);
    let balance: RoleBalanceDetail['balance'] = 'balanced';
    if (ratio < 0.8) balance = 'need_leaders';
    else if (ratio > 1.2) balance = 'need_followers';

    return { leadersPercent, followersPercent, switchesPercent, balance };
  }

  // Rule 4 — Weighted average level
  getAverageLevel(voters: VoterData[]): number {
    const interested = voters.filter(
      (v) => v.status === VoteStatus.GOING || v.status === VoteStatus.MAYBE
    );
    if (interested.length === 0) return 0;
    const weightedSum = interested.reduce(
      (sum, v) => sum + LEVEL_WEIGHT[v.level] * v.reliability,
      0
    );
    const totalWeight = interested.reduce((sum, v) => sum + v.reliability, 0);
    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  }

  // Level distribution as percentages (0–100)
  getLevelDistribution(voters: VoterData[]): Record<Level, number> {
    const interested = voters.filter(
      (v) => v.status === VoteStatus.GOING || v.status === VoteStatus.MAYBE
    );
    const counts: Record<Level, number> = {
      [Level.BEGINNER]: 0,
      [Level.INITIATION]: 0,
      [Level.COMFORTABLE]: 0,
      [Level.INTERMEDIATE]: 0,
      [Level.ADVANCED]: 0,
    };
    interested.forEach((v) => counts[v.level]++);
    const total = interested.length;
    if (total === 0) return counts;
    return {
      [Level.BEGINNER]: Math.round((counts[Level.BEGINNER] / total) * 100),
      [Level.INITIATION]: Math.round((counts[Level.INITIATION] / total) * 100),
      [Level.COMFORTABLE]: Math.round((counts[Level.COMFORTABLE] / total) * 100),
      [Level.INTERMEDIATE]: Math.round((counts[Level.INTERMEDIATE] / total) * 100),
      [Level.ADVANCED]: Math.round((counts[Level.ADVANCED] / total) * 100),
    };
  }

  // Recommendation text based on combined rules
  getRecommendation(vibe: Vibe, averageLevel: number, balance: RoleBalanceDetail['balance']): string {
    if (vibe === 'quiet') return 'Poca gente de momento.';
    if (averageLevel >= 4) return 'Exigente para principiantes.';
    if (balance === 'need_followers') return 'Puede haber espera para followers.';
    if (balance === 'need_leaders') return 'Puede haber espera para leaders.';
    if (vibe === 'lively' || vibe === 'packed') return 'Noche animada, ¡buena opción!';
    return 'Buen día para practicar.';
  }

  // Compose full prediction from voter data
  predict(voters: VoterData[], maxCapacity?: number): PredictionResult {
    const hasVotes = voters.some(
      (v) => v.status === VoteStatus.GOING || v.status === VoteStatus.MAYBE
    );
    const estimatedAttendance = this.estimateAttendance(voters);
    const vibe = this.classifyVibe(estimatedAttendance, hasVotes, maxCapacity);
    const levelDistribution = this.getLevelDistribution(voters);
    const roleBalance = this.getRoleBalance(voters);
    const averageLevel = this.getAverageLevel(voters);
    const recommendation = this.getRecommendation(vibe, averageLevel, roleBalance.balance);

    const result: PredictionResult = {
      vibe,
      estimatedAttendance,
      levelDistribution,
      roleBalance,
      recommendation,
    };

    if (maxCapacity) {
      result.maxCapacity = maxCapacity;
      result.capacityOccupancyPct = Math.round((estimatedAttendance / maxCapacity) * 100);
    }

    return result;
  }
}
