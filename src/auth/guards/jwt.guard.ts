import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC } from '../decorators/public.decorator';
import { AuthVerifiedGuard } from './verified.guard';

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly authVerifiedGuard: AuthVerifiedGuard
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const canLogin = await super.canActivate(context);
    const isVerified = await this.authVerifiedGuard.canActivate(context);

    return canLogin && isVerified;
  }
}
