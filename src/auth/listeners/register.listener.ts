import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthRegisterEvent } from '../events/register.event';

@Injectable()
export class AuthRegisterListener {
  @OnEvent(AuthRegisterEvent.name)
  handle(event: AuthRegisterEvent) {
    console.log(event);
  }
}
