import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { VerificationController } from './verification.controller';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Verification]),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 3
      }
    ])
  ],
  providers: [VerificationService],
  exports: [VerificationService],
  controllers: [VerificationController]
})
export class VerificationModule {}
