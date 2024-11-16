import { Module } from '@nestjs/common';
import { TwoFactorAuthenticationService } from './two-factor-authentication.service';
import { TwoFactorAuthenticationController } from './two-factor-authentication.controller';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { TwoFactorAuthenticationGuard } from './guards/two-factor-authentication.guard';
import { TotpModule } from 'src/totp/totp.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, TotpModule, JwtModule],
  providers: [
    TwoFactorAuthenticationService,
    TwoFactorAuthenticationGuard,
    {
      provide: APP_GUARD,
      useExisting: TwoFactorAuthenticationGuard
    }
  ],
  controllers: [TwoFactorAuthenticationController]
})
export class TwoFactorAuthenticationModule {}
