import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from 'src/user/user.service';
import { UserVerifiedEvent } from './events/user-verified.event';
import { TotpService } from 'src/totp/totp.service';

@Injectable()
export class UserVerificationService {
  constructor(
    private readonly userService: UserService,
    private readonly totpService: TotpService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async verify(userId: string) {
    const updateResult = await this.userService.update(userId, {
      verifiedAt: new Date(),
      verificationToken: null,
      verificationTokenExpirationAt: null
    });

    this.eventEmitter.emit(
      UserVerifiedEvent.name,
      new UserVerifiedEvent(userId)
    );

    return updateResult;
  }

  refresh(userId: string) {
    const { otp: verificationToken, expires } = this.totpService.generate();
    const verificationTokenExpirationAt = new Date(expires);

    return this.userService.update(userId, {
      verificationToken,
      verificationTokenExpirationAt
    });
  }
}
