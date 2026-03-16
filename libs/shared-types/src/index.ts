export type Rol = 'leader' | 'follower' | 'switch' | 'admin';
export type Nivel = 'nuevo' | 'iniciacion' | 'social_comodo' | 'intermedio' | 'avanzado';
// Estilos are now managed dynamically via the DanceStyle entity
export type Estilo = string;
export type VoteEstado = 'voy' | 'tal_vez' | 'no_voy';
export type Ambiente = 'flojo' | 'normal' | 'animado' | 'muy_lleno';
export type TipoEvento = 'social' | 'intensivo' | 'congreso';

export interface RoleBalanceDetail {
  leadersPercent: number;
  followersPercent: number;
  switchesPercent: number;
  balance: 'equilibrado' | 'faltan_leaders' | 'faltan_followers';
}

export interface DanceStyle {
  id: string;
  slug: string;
  nombre: string;
  activo: boolean;
}

export interface Academia {
  id: string;
  nombre: string;
  ciudad?: string;
}

export interface UserProfile {
  id: string;
  alias: string;
  ciudad: string;
  rol: Rol;
  nivel: Nivel;
  estilos: string[];
  academiaId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Venue {
  id: string;
  nombre: string;
  ciudad: string;
  lat?: number;
  lng?: number;
  aforoMaximo?: number;
  estilos: Estilo[];
}

export interface WeeklyEvent {
  id: string;
  venue: Venue;
  tipo: TipoEvento;
  nombre?: string;
  fotoUrl?: string | null;
  eventDate: string;
  eventStart: string;
  semanaIso: string;
  horaInicio?: string;
  diaSemana?: number | null;
  fechaInicio?: string;
  estilos: string[];
  // Social
  tallerIncluido?: boolean;
  precioEntrada?: number;
  instructores?: string[];
  // Intensivo
  titulo?: string;
  nivel?: string;
  precio?: number;
  profesores?: string[];
  fechaFin?: string;
  // Congreso
  localidad?: string;
  duracionDias?: number;
  precios?: string;
  enlaceWeb?: string;
  // Aggregates
  totalInteresados: number;
  ambienteColor: Ambiente;
  roleBalance?: RoleBalanceDetail;
  userVote: VoteEstado | null;
  userVoteId: string | null;
}

export interface EventAnalytics {
  ambiente: Ambiente;
  asistenciaEstimada: number;
  aforoMaximo?: number;
  aforoOcupacionPct?: number;
  nivelDistribution: Record<Nivel, number>;
  roleBalance: RoleBalanceDetail;
  recommendation: string;
}

export interface IntentionVote {
  id: string;
  eventId: string;
  semanaIso: string;
  estado: VoteEstado;
}

export interface AuthResponse {
  accessToken: string;
  user: UserProfile;
}
