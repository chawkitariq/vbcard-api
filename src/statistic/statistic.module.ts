import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statistic])],
  providers: [StatisticService],
  controllers: [StatisticController]
})
export class StatisticModule {}
