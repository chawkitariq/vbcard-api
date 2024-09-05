import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthVerifiedGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user?.isVerified()) {
      throw new UnauthorizedException('User not verified');
    }

    return true;
  }
}
