import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthenticationRegisterEvent } from '../../authentication/events/authentication-register.event';
import { UserVerificationService } from '../user-verification.service';

@Injectable()
export class AuthenticationRegisterListener {
  constructor(private readonly authVerificationService: UserVerificationService) {}

  @OnEvent(AuthenticationRegisterEvent.name)
  async handle({ userId }: AuthenticationRegisterEvent) {
    await this.authVerificationService.refresh(userId);
  }
}
