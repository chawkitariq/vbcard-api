import { Module } from '@nestjs/common';
import { UserVerificationService } from './user-verification.service';
import { UserModule } from 'src/user/user.module';
import { AuthenticationRegisterListener } from './listeners/authentication-register.listener';
import { UserVerificationController } from './user-verification.controller';
import { UserVerificationGuard } from './guards/user-verification.guard';
import { APP_GUARD } from '@nestjs/core';
import { TotpModule } from 'src/totp/totp.module';

@Module({
  imports: [UserModule, TotpModule],
  providers: [
    UserVerificationService,
    AuthenticationRegisterListener,
    UserVerificationGuard,
    {
      provide: APP_GUARD,
      useClass: UserVerificationGuard
    }
  ],
  controllers: [UserVerificationController],
  exports: [UserVerificationService, UserVerificationGuard]
})
export class UserVerificationModule {}
