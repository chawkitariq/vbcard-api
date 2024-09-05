import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthVerifiedGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { id: userId } = request.user;

    let user: User | null;

    try {
      user = await this.userService.findOne(userId);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!user?.isVerified()) {
      throw new UnauthorizedException('User not verified');
    }

    return true;
  }
}
