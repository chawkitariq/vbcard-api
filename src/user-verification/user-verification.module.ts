import { Module } from '@nestjs/common';
import { UserVerificationService } from './user-verification.service';
import { UserModule } from 'src/user/user.module';
import { AuthRegisterListener } from './listeners/auth-register.listener';
import { UserVerificationController } from './user-verification.controller';
import { UserVerificationGuard } from './guards/user-verification.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UserModule],
  providers: [
    UserVerificationService,
    AuthRegisterListener,
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
