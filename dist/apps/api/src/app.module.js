"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const schedule_1 = require("@nestjs/schedule");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const venues_module_1 = require("./modules/venues/venues.module");
const events_module_1 = require("./modules/events/events.module");
const dance_styles_module_1 = require("./modules/dance-styles/dance-styles.module");
const academias_module_1 = require("./modules/academias/academias.module");
const votes_module_1 = require("./modules/votes/votes.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const scheduler_module_1 = require("./modules/scheduler/scheduler.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.local', '.env'],
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '5432'),
                username: process.env.DB_USERNAME || 'postgres',
                password: process.env.DB_PASSWORD || 'postgres',
                database: process.env.DB_NAME || 'mobile_app',
                autoLoadEntities: true,
                synchronize: process.env.NODE_ENV !== 'production',
                logging: process.env.NODE_ENV !== 'production',
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
                signOptions: { expiresIn: '30d' },
            }),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            venues_module_1.VenuesModule,
            events_module_1.EventsModule,
            dance_styles_module_1.DanceStylesModule,
            academias_module_1.AcademiasModule,
            votes_module_1.VotesModule,
            notifications_module_1.NotificationsModule,
            scheduler_module_1.SchedulerModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map