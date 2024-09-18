import { Module } from '@nestjs/common';
import { ContactStatisticTrackingService } from './contact-statistic-tracking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactStatisticTracking } from './entities/contact-statistic-tracking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactStatisticTracking])],
  providers: [ContactStatisticTrackingService]
})
export class ContactStatisticTrackingModule {}
