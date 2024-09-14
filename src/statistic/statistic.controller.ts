import { Controller, Param, Patch } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ContactIdDto } from 'src/dto/contact-id.dto';

@Controller('contacts/:contactId/statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Patch('viewed')
  async incrementViewed(@Param() { contactId }: ContactIdDto) {
    return this.statisticService.incrementViewed(contactId);
  }

  @Patch('shared')
  async incrementShared(@Param() { contactId }: ContactIdDto) {
    return this.statisticService.incrementShared(contactId);
  }

  @Patch('scanned')
  async incrementScanned(@Param() { contactId }: ContactIdDto) {
    return this.statisticService.incrementScanned(contactId);
  }
}
