import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { VerificationController } from './verification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Verification])],
  providers: [VerificationService],
  exports: [VerificationService],
  controllers: [VerificationController]
})
export class VerificationModule {}
