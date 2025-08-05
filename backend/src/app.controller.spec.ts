// backend/src/app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as packageJson from '../package.json';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // Test for the root API status endpoint
  describe('getApiStatus', () => {
    it('should return the API status object', () => {
      const expectedStatus = {
        status: 'ok',
        name: packageJson.name,
        version: packageJson.version,
        api_endpoints: [
          { path: '/status', method: 'GET' },
          { path: '/health', method: 'GET' },
        ],
      };
      expect(appController.getApiStatus()).toEqual(expectedStatus);
    });
  });

  // Test for the health check endpoint
  describe('getHealthCheck', () => {
    it('should return a simple health status', () => {
      expect(appController.getHealthCheck()).toEqual({ status: 'ok' });
    });
  });
});
