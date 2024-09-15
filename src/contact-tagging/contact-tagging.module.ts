import { Module } from '@nestjs/common';
import { ContactTaggingService } from './contact-tagging.service';
import { ContactTaggingController } from './contact-tagging.controller';
import { ContactTagging } from './entities/contact-tagging.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactTagging]), ContactModule, TagModule],
  controllers: [ContactTaggingController],
  providers: [ContactTaggingService]
})
export class ContactTaggingModule {}
