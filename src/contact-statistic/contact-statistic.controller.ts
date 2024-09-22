import { Controller, Param, Patch, UseInterceptors } from '@nestjs/common';
import { ContactStatisticService } from './contact-statistic.service';
import { ContactIdDto } from 'src/dto/contact-id.dto';
import { ContactStatisticTrackingInterceptor } from 'src/contact-statistic-tracking/interceptors/contact-statistic-tracking.interceptor';

@UseInterceptors(ContactStatisticTrackingInterceptor)
@Controller('contacts/:contactId/statistics')
export class ContactStatisticController {
  constructor(
    private readonly contactStatisticService: ContactStatisticService
  ) {}

  @Patch('viewed')
  async incrementViewed(@Param() { contactId }: ContactIdDto) {
    return this.contactStatisticService.incrementViewed(contactId);
  }

  @Patch('shared')
  async incrementShared(@Param() { contactId }: ContactIdDto) {
    return this.contactStatisticService.incrementShared(contactId);
  }

  @Patch('scanned')
  async incrementScanned(@Param() { contactId }: ContactIdDto) {
    return this.contactStatisticService.incrementScanned(contactId);
  }
}
