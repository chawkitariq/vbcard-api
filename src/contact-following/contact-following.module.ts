import { Module } from '@nestjs/common';
import { ContactFollowingService } from './contact-following.service';
import { ContactFollowingController } from './contact-following.controller';
import { ContactFollowing } from './entities/contact-following.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactFollowing]), ContactModule],
  controllers: [ContactFollowingController],
  providers: [ContactFollowingService],
})
export class ContactFollowingModule {}
