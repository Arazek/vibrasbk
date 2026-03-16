import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/api/docs', 302)
  root() {}

  @Get('api/health')
  getHealth() {
    return this.appService.getHealth();
  }
}
