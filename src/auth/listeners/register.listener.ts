import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthRegisterEvent } from '../events/register.event';
import { VerificationService } from 'src/verification/verification.service';

@Injectable()
export class AuthRegisterListener {
  constructor(private readonly verificationService: VerificationService) {}

  @OnEvent(AuthRegisterEvent.name)
  async handle({ userId }: AuthRegisterEvent) {
    await this.verificationService.refresh(userId);
  }
}
