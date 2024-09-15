import { Module } from '@nestjs/common';
import { ContactStatisticService } from './contact-statistic.service';
import { ContactStatisticController } from './contact-statistic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/contact/entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactStatisticService],
  controllers: [ContactStatisticController]
})
export class ContactStatisticModule {}
