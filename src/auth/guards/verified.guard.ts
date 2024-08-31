import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthVerifiedGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
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
