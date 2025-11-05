import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AUTH_SERVICE } from './auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(ctx);
    return this.authClient
      .send('validate_user', {
        Authentication: authentication,
      })
      .pipe(
        tap((res) => this.addUser(res, ctx)),
        catchError(() => {
          throw new UnauthorizedException('Authentication is invalid');
        }),
      );
  }

  getAuthentication(ctx: ExecutionContext) {
    let authentication: string | undefined;
    if (ctx.getType() === 'rpc') {
      authentication = ctx.switchToRpc().getData().Authentication;
    } else if (ctx.getType() === 'http') {
      authentication = ctx.switchToHttp().getRequest().cookies?.Authentication;
    }
    console.log('Authentication:', authentication);

    if (!authentication) {
      throw new UnauthorizedException('Authentication is required');
    }
    return authentication;
  }

  private addUser(res: any, ctx: ExecutionContext) {
    if (ctx.getType() === 'rpc') {
      ctx.switchToRpc().getData().user = res;
    } else if (ctx.getType() === 'http') {
      ctx.switchToHttp().getRequest().user = res;
    }
  }
}
