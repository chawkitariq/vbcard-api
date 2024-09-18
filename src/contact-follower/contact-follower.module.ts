import { Module } from '@nestjs/common';
import { ContactFollowerService } from './contact-follower.service';
import { ContactFollowerController } from './contact-follower.controller';
import { ContactFollower } from './entities/contact-follower.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactFollower]), ContactModule],
  controllers: [ContactFollowerController],
  providers: [ContactFollowerService]
})
export class ContactFollowerModule {}
