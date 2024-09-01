import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthRegisterEvent } from '../events/register.event';
import { VerificationService } from 'src/verification/verification.service';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthRegisterListener {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly verificationService: VerificationService
  ) {}

  @OnEvent(AuthRegisterEvent.name)
  async handle({ userId }: AuthRegisterEvent) {
    const token = this.tokenService.generateOpt();
    const expiredAt = this.generateExpiration();

    const verification = await this.verificationService.create({
      token,
      expiredAt
    });

    await this.userService.update(userId, { verification });
  }

  generateExpiration(): Date {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 1);
    return expiration;
  }
}
