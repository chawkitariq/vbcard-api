import { Controller, Post } from '@nestjs/common';
import { TwoFactorAuthService } from './two-factor-auth.service';

@Controller('2fa')
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

  @Post('enabled')
  async enabled() {
    this.twoFactorAuthService.enabled();
  }

  @Post('generate')
  async generate() {
    this.twoFactorAuthService.generate();
  }

  @Post('verify')
  async verify() {
    this.twoFactorAuthService.verify();
  }
}
