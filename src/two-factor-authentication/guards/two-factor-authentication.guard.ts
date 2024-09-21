import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from 'src/decorators/public.decorator';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TwoFactorAuthenticationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.twoFactorAuthenticationEnabledAt && !user.verificationTokenExpirationAt) {
      throw new UnauthorizedException('2FA required');
    }

    return true;
  }
}
