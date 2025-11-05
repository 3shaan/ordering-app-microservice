import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/schemas/user.schema';
import { Response } from 'express';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        (this.configService.get<number>('JWT_EXPIRATION_TIME') ?? 0),
    );
    response.cookie('jwt', this.jwtService.sign(tokenPayload), {
      httpOnly: true,
      expires,
    });
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
