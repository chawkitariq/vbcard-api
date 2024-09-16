import { Module } from '@nestjs/common';
import { UserVerificationService } from './user-verification.service';
import { UserModule } from 'src/user/user.module';
import { AuthRegisterListener } from './listeners/auth-register.listener';
import { UserVerificationController } from './user-verification.controller';

@Module({
  imports: [UserModule],
  providers: [UserVerificationService, AuthRegisterListener],
  controllers: [UserVerificationController],
  exports: [UserVerificationService]
})
export class UserVerificationModule {}
