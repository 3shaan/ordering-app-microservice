import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../users/user.service';
import { TokenPayload } from '../auth.service';
import { Types } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: { Authentication: string }) => request?.Authentication,
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET') || '',
    });
  }

  async validate({ userId }: TokenPayload) {
    try {
      return await this.userService.getUser({
        _id: new Types.ObjectId(userId),
      });
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
