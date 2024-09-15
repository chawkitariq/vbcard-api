import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthRegisterEvent } from '../events/register.event';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthRegisterListener {
  constructor(private readonly userService: UserService) {}

  @OnEvent(AuthRegisterEvent.name)
  async handle({ userId }: AuthRegisterEvent) {
    await this.userService.refreshOneVerification(userId);
  }
}
