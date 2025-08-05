// backend/src/app.controller.ts
import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import type { ApiStatus } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiStatus(): ApiStatus {
    return this.appService.getApiStatus();
  }

  @Get('/health')
  @HttpCode(200)
  getHealthCheck(): { status: 'ok' } {
    return this.appService.getHealthCheck();
  }

  @Get('health')
  getHealth(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'notes-api',
    };
  }
}
