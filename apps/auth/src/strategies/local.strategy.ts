import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../users/user.service';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
    });
  }

  validate(email: string, password: string): Promise<any> {
    return this.userService.validateUser(email, password);
  }
}
