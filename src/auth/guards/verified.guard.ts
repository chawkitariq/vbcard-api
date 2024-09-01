import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { IS_SKIP_VERIFIED_KEY } from '../decorators/skip-verified.decorator';

@Injectable()
export class AuthVerifiedGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext) {
    const isSkipVerified = this.reflector.getAllAndOverride<boolean>(IS_SKIP_VERIFIED_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isSkipVerified) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user) {
      throw new UnauthorizedException('Not authenticated');
    }

    const { verification } = await this.userService.findOne(user.id);

    if (!verification?.verifiedAt) {
      throw new ForbiddenException('Not verified');
    }

    return true;
  }
}
