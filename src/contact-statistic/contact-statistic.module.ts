import { Module } from '@nestjs/common';
import { ContactStatisticService } from './contact-statistic.service';
import { ContactStatisticController } from './contact-statistic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactStatistic } from './entities/contact-statistic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactStatistic])],
  providers: [ContactStatisticService],
  controllers: [ContactStatisticController]
})
export class ContactStatisticModule {}
