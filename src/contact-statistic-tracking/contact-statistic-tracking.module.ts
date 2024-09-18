import { Module } from '@nestjs/common';
import { ContactStatisticTrackingService } from './contact-statistic-tracking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactStatisticTracking } from './entities/contact-statistic-tracking.entity';
import { ContactStatisticTrackingInterceptor } from './interceptors/contact-statistic-tracking.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([ContactStatisticTracking])],
  providers: [ContactStatisticTrackingService, ContactStatisticTrackingInterceptor],
  exports: [ContactStatisticTrackingService, ContactStatisticTrackingInterceptor]
})
export class ContactStatisticTrackingModule {}
