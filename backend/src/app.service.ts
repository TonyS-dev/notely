// backend/src/app.service.ts
import { Injectable } from '@nestjs/common';
import * as packageJson from '../package.json';

export interface ApiStatus {
  status: 'ok';
  name: string;
  version: string;
}

@Injectable()
export class AppService {
  /**
   * Returns a status object with information about the API.
   */
  getApiStatus(): ApiStatus {
    return {
      status: 'ok',
      name: packageJson.name,
      version: packageJson.version,
    };
  }

  /**
   * Returns a simple health check status.
   */
  getHealthCheck(): { status: 'ok' } {
    return { status: 'ok' };
  }
}
