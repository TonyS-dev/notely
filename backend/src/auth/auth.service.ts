// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // This method is called by the login endpoint
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    // Find the user by email
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // If credentials are valid, create the JWT payload
    const payload = { sub: user.id, username: user.username };

    // Sign the token and return it
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
