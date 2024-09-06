import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_SKIP_VERIFICATION } from '../decorators/skip-verification.decorator';

@Injectable()
export class AuthVerifiedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const isSkipVerification = this.reflector.getAllAndOverride<boolean>(IS_SKIP_VERIFICATION, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isSkipVerification) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.isVerified?.()) {
      throw new UnauthorizedException('User not verified');
    }

    return true;
  }
}
