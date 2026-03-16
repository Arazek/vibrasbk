import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    root(): void;
    getHealth(): {
        status: string;
        timestamp: Date;
        message: string;
    };
}
//# sourceMappingURL=app.controller.d.ts.map