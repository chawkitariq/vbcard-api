import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from 'src/user/user.service';
import { UserVerifiedEvent } from './events/user-verified.event';

@Injectable()
export class UserVerificationService {
  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async verify(userId: string) {
    const updateResult = await this.userService.update(userId, {
      verifiedAt: new Date(),
      verificationToken: null,
      verificationTokenExpirationAt: null
    });

    this.eventEmitter.emit(UserVerifiedEvent.name, new UserVerifiedEvent(userId));

    return updateResult;
  }

  refresh(userId: string) {
    const verificationToken = this.generateOptToken();
    const verificationTokenExpirationAt = this.generateExpirationDate();

    return this.userService.update(userId, {
      verificationToken,
      verificationTokenExpirationAt
    });
  }

  private generateOptToken(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private generateExpirationDate(): Date {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 1);
    return expiration;
  }
}
