import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthRegisterEvent } from '../events/register.event';
import { UserVerificationService } from 'src/user-verification/user-verification.service';

@Injectable()
export class AuthRegisterListener {
  constructor(private readonly verificationService: UserVerificationService) {}

  @OnEvent(AuthRegisterEvent.name)
  async handle({ userId }: AuthRegisterEvent) {
    await this.verificationService.refresh(userId);
  }
}
