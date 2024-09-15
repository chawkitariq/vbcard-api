import { Module } from '@nestjs/common';
import { UserVerificationService } from './user-verification.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  exports: [UserVerificationService],
  providers: [UserVerificationService]
})
export class UserVerificationModule {}
