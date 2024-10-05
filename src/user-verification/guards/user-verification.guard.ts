import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from 'src/decorators/public.decorator';
import { IS_SKIP_USER_VERIFICATION } from 'src/decorators/skip-user-verification';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserVerificationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const isSkipUserVerification = this.reflector.getAllAndOverride<boolean>(
      IS_SKIP_USER_VERIFICATION,
      [context.getHandler(), context.getClass()]
    );

    if (isSkipUserVerification) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user?.isVerified?.()) {
      throw new ForbiddenException('User not verified');
    }

    return true;
  }
}
