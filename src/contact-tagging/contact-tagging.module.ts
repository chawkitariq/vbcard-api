import { Module } from '@nestjs/common';
import { ContactContactTaggingService } from './contact-tagging.service';
import { ContactContactTaggingController } from './contact-tagging.controller';
import { ContactContactTagging } from './entities/contact-tagging.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';
import { ContactTagModule } from 'src/contact-tag/contact-tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactContactTagging]), ContactModule, ContactTagModule],
  controllers: [ContactContactTaggingController],
  providers: [ContactContactTaggingService]
})
export class ContactContactTaggingModule {}
