import { Module } from '@nestjs/common';
import { ContactTagService } from './contact-tag.service';
import { ContactTagController } from './contact-tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactTag } from './entities/contact-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactTag])],
  controllers: [ContactTagController],
  providers: [ContactTagController, ContactTagService],
  exports: [ContactTagController, ContactTagService]
})
export class ContactTagModule {}
