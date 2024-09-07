import { Module } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FollowingController } from './following.controller';
import { Following } from './entities/following.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  imports: [TypeOrmModule.forFeature([Following]), ContactModule],
  controllers: [FollowingController],
  providers: [FollowingService],
})
export class FollowingModule {}
