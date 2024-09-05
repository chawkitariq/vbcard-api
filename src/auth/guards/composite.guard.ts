import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthVerifiedGuard } from './verified.guard';
import { AuthJwtGuard } from './jwt.guard';

@Injectable()
export class AuthCompositeGuard implements CanActivate {
  constructor(
    private authJwtGuard: AuthJwtGuard,
    private authVerifiedGuard: AuthVerifiedGuard
  ) {}

  async canActivate(context: ExecutionContext) {
    const isAuthJwtPassed = await this.authJwtGuard.canActivate(context);
    const isAuthVerifiedPassed = await this.authVerifiedGuard.canActivate(context);

    return isAuthJwtPassed && isAuthVerifiedPassed;
  }
}
