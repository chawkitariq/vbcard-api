import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC } from '../../decorators/public.decorator';
import { IS_SKIP_JWT_AUTHENTICATION } from 'src/decorators/skip-jwt-authentication';

@Injectable()
export class AuthenticationJwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const isSkipJwtAuthentication = this.reflector.getAllAndOverride<boolean>(
      IS_SKIP_JWT_AUTHENTICATION,
      [context.getHandler(), context.getClass()]
    );

    if (isSkipJwtAuthentication) {
      return true;
    }

    return super.canActivate(context);
  }
}
