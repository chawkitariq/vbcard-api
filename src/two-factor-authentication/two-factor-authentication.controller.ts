import { Controller, Post } from '@nestjs/common';
import { TwoFactorAuthenticationService } from './two-factor-authentication.service';

@Controller('2fa')
export class TwoFactorAuthenticationController {
  constructor(private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService) {}

  @Post('enabled')
  async enabled() {
    this.twoFactorAuthenticationService.enabled();
  }

  @Post('generate')
  async generate() {
    this.twoFactorAuthenticationService.generate();
  }

  @Post('verify')
  async verify() {
    this.twoFactorAuthenticationService.verify();
  }
}
