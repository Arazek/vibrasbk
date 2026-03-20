import 'reflect-metadata';
import { join } from 'path';
import { DataSource } from 'typeorm';

import { User } from './modules/users/entities/user.entity';
import { Venue } from './modules/venues/entities/venue.entity';
import { Academia } from './modules/academias/entities/academia.entity';
import { DanceStyle } from './modules/dance-styles/entities/dance-style.entity';
// STI: parent + all child entities must be listed together
import { RecurringEvent } from './modules/events/entities/recurring-event.entity';
import { SocialEvent } from './modules/events/entities/social-event.entity';
import { TallerEvent } from './modules/events/entities/taller-event.entity';
import { CongresoEvent } from './modules/events/entities/congreso-event.entity';
import { IntensivoEvent } from './modules/events/entities/intensivo-event.entity';
import { IntentionVote } from './modules/votes/entities/intention-vote.entity';
import { AttendanceVerification } from './modules/votes/entities/attendance-verification.entity';
import { ReliabilityMetric } from './modules/votes/entities/reliability-metric.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'vibrasbk',
  schema: process.env.DB_SCHEMA || 'vibrasbk',
  extra: { options: `-c search_path=${process.env.DB_SCHEMA || 'vibrasbk'},public` },
  entities: [
    User,
    Venue,
    Academia,
    DanceStyle,
    RecurringEvent,
    SocialEvent,
    TallerEvent,
    CongresoEvent,
    IntensivoEvent,
    IntentionVote,
    AttendanceVerification,
    ReliabilityMetric,
  ],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
});
