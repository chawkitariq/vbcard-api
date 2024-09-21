import { Injectable } from '@nestjs/common';

@Injectable()
export class TwoFactorAuthenticationService {
  async enabled() {}

  async generate() {}

  async verify() {}
}
