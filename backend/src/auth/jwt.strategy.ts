// backend/src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// Define the shape of the JWT payload
export interface JwtPayload {
  sub: string;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET'); // Get the secret from the environment variables

    // Add a check to ensure the secret exists
    if (!secret) {
      throw new Error(
        'JWT_SECRET is not defined in the environment variables!',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // Pass the guaranteed secret
    });
  }

  validate(payload: JwtPayload): any {
    // The return value here is what gets attached to req.user
    // Rename 'sub' to 'userId' for clarity
    return { userId: payload.sub, username: payload.username };
  }
}
