import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  exports: [VerificationService],
  providers: [VerificationService]
})
export class VerificationModule {}
