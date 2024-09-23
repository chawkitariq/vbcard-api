import { Controller, Patch, UseInterceptors } from '@nestjs/common';
import { ContactStatisticService } from './contact-statistic.service';
import { ContactStatisticTrackingInterceptor } from 'src/contact-statistic-tracking/interceptors/contact-statistic-tracking.interceptor';
import { Id } from 'src/decorators/id.decorator';

@UseInterceptors(ContactStatisticTrackingInterceptor)
@Controller('contacts/:contactId/statistics')
export class ContactStatisticController {
  constructor(
    private readonly contactStatisticService: ContactStatisticService
  ) {}

  @Patch('viewed')
  async incrementViewed(@Id('contactId') contactId: string) {
    return this.contactStatisticService.incrementViewed(contactId);
  }

  @Patch('shared')
  async incrementShared(@Id('contactId') contactId: string) {
    return this.contactStatisticService.incrementShared(contactId);
  }

  @Patch('scanned')
  async incrementScanned(@Id('contactId') contactId: string) {
    return this.contactStatisticService.incrementScanned(contactId);
  }
}
