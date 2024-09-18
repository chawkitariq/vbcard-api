import { Module } from '@nestjs/common';
import { ContactStatisticService } from './contact-statistic.service';
import { ContactStatisticController } from './contact-statistic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/contact/entities/contact.entity';
import { ContactStatisticTrackingModule } from 'src/contact-statistic-tracking/contact-statistic-tracking.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), ContactStatisticTrackingModule],
  providers: [ContactStatisticService],
  controllers: [ContactStatisticController]
})
export class ContactStatisticModule {}
