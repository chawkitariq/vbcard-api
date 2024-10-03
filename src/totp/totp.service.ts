import { Injectable } from '@nestjs/common';
import { TOTP } from 'totp-generator';

@Injectable()
export class TotpService {
  generateRandomBase32(length) {
    const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const array = new Int32Array(1);
    crypto.getRandomValues(array);
    const i = array[0];
    let result = '';
    for (let j = 0; j < length; j++) {
      result += base[(i >>> (5 * j)) & 0x1f];
    }
    return result;
  }

  generateOtpAuthUrl(issuer: string, userEmail: string, secret: string) {
    const url = `otpauth://totp/${issuer}:${userEmail}?secret=${secret}&issuer=${issuer}`;
    return url;
  }

  generate(secret = this.generateRandomBase32(20)) {
    return TOTP.generate(secret);
  }

  verify(token: string, secret: string): boolean {
    const { otp } = TOTP.generate(secret);
    return token === otp;
  }
}
