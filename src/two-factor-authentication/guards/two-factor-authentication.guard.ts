import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from 'src/decorators/public.decorator';
import { IS_SKIP_TWO_FACTOR_AUTHENTICATION } from 'src/decorators/skip-two-factor-authentication';

@Injectable()
export class TwoFactorAuthenticationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const isSkipTwoFactorAuthentication =
      this.reflector.getAllAndOverride<boolean>(
        IS_SKIP_TWO_FACTOR_AUTHENTICATION,
        [context.getHandler(), context.getClass()]
      );

    if (isSkipTwoFactorAuthentication) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const { user } = request;

    if (user?.twoFactorAuthenticationEnabledAt) {
      throw new ForbiddenException('2FA required');
    }

    return true;
  }
}
