export type Role = 'leader' | 'follower' | 'switch' | 'admin';
export type Level = 'beginner' | 'initiation' | 'comfortable' | 'intermediate' | 'advanced';
// Styles are now managed dynamically via the DanceStyle entity
export type Estilo = string;
export type VoteStatus = 'going' | 'maybe' | 'not_going';
export type Vibe = 'quiet' | 'normal' | 'lively' | 'packed';
export type EventType = 'social' | 'intensive' | 'congress';

export interface RoleBalanceDetail {
  leadersPercent: number;
  followersPercent: number;
  switchesPercent: number;
  balance: 'balanced' | 'need_leaders' | 'need_followers';
}

export interface DanceStyle {
  id: string;
  slug: string;
  name: string;
  active: boolean;
}

export interface Academia {
  id: string;
  name: string;
  city?: string;
}

export interface UserProfile {
  id: string;
  alias: string;
  city: string;
  role: Role;
  level: Level;
  styles: string[];
  academyId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  lat?: number;
  lng?: number;
  maxCapacity?: number;
  styles: Estilo[];
}

export interface WeeklyEvent {
  id: string;
  venue: Venue;
  type: EventType;
  name?: string;
  photoUrl?: string | null;
  eventDate: string;
  eventStart: string;
  isoWeek: string;
  startTime?: string;
  dayOfWeek?: number | null;
  startDate?: string;
  styles: string[];
  // Social
  workshopIncluded?: boolean;
  entryPrice?: number;
  instructors?: string[];
  // Intensive
  title?: string;
  level?: string;
  price?: number;
  endDate?: string;
  // Congress
  locality?: string;
  durationDays?: number;
  prices?: string;
  websiteUrl?: string;
  // Aggregates
  totalInterested: number;
  vibeColor: Vibe;
  roleBalance?: RoleBalanceDetail;
  userVote: VoteStatus | null;
  userVoteId: string | null;
}

export interface EventAnalytics {
  vibe: Vibe;
  estimatedAttendance: number;
  maxCapacity?: number;
  capacityOccupancyPct?: number;
  levelDistribution: Record<Level, number>;
  roleBalance: RoleBalanceDetail;
  recommendation: string;
}

export interface IntentionVote {
  id: string;
  eventId: string;
  isoWeek: string;
  status: VoteStatus;
}

export interface AuthResponse {
  accessToken: string;
  user: UserProfile;
}
