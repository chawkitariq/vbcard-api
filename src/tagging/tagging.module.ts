import { Module } from '@nestjs/common';
import { TaggingService } from './tagging.service';
import { TaggingController } from './tagging.controller';
import { Tagging } from './entities/tagging.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tagging]), ContactModule, TagModule],
  controllers: [TaggingController],
  providers: [TaggingService]
})
export class TaggingModule {}
