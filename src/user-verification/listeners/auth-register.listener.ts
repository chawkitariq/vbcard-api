import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthRegisterEvent } from '../../auth/events/register.event';
import { UserVerificationService } from '../user-verification.service';

@Injectable()
export class AuthRegisterListener {
  constructor(private readonly authVerificationService: UserVerificationService) {}

  @OnEvent(AuthRegisterEvent.name)
  async handle({ userId }: AuthRegisterEvent) {
    await this.authVerificationService.refresh(userId);
  }
}
