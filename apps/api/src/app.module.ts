import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { VenuesModule } from './modules/venues/venues.module';
import { EventsModule } from './modules/events/events.module';
import { DanceStylesModule } from './modules/dance-styles/dance-styles.module';
import { AcademiasModule } from './modules/academias/academias.module';
import { VotesModule } from './modules/votes/votes.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'vibrasbk',
      schema: process.env.DB_SCHEMA || 'vibrasbk',
      extra: { options: `-c search_path=${process.env.DB_SCHEMA || 'vibrasbk'},public` },
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
      migrations: [__dirname + '/migrations/*.js'],
      migrationsRun: process.env.NODE_ENV === 'production',
      migrationsTableName: 'typeorm_migrations',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      signOptions: { expiresIn: '30d' },
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    VenuesModule,
    EventsModule,
    DanceStylesModule,
    AcademiasModule,
    VotesModule,
    NotificationsModule,
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
