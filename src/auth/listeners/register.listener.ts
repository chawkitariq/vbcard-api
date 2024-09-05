import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthRegisterEvent } from '../events/register.event';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthRegisterListener {
  constructor(
    private readonly userService: UserService,
  ) {}

  // @OnEvent(AuthRegisterEvent.name)
  // async handle({ userId }: AuthRegisterEvent) {
  //   const token = this.generateOptToken();
  //   const expiredAt = this.generateExpiration();

  //   const verification = await this.verificationService.create({
  //     token,
  //     expiredAt
  //   });

  //   await this.userService.update(userId, { verification });
  // }

  generateOptToken(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  generateExpiration(): Date {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 1);
    return expiration;
  }
}
