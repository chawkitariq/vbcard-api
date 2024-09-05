import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthRegisterEvent } from '../events/register.event';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthRegisterListener {
  constructor(private readonly userService: UserService) {}

  @OnEvent(AuthRegisterEvent.name)
  async handle({ userId }: AuthRegisterEvent) {
    const verificationToken = this.generateOptToken();
    const verificationTokenExpirationAt = this.generateExpirationDate();

    await this.userService.update(userId, {
      verificationToken,
      verificationTokenExpirationAt
    });
  }

  generateOptToken(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  generateExpirationDate(): Date {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 1);
    return expiration;
  }
}
