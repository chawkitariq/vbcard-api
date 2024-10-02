import { Controller, Patch, UseInterceptors } from '@nestjs/common';
import { ContactStatisticService } from './contact-statistic.service';
import { ContactStatisticTrackingInterceptor } from 'src/contact-statistic-tracking/interceptors/contact-statistic-tracking.interceptor';
import { Id } from 'src/decorators/id.decorator';

@UseInterceptors(ContactStatisticTrackingInterceptor)
@Controller('contacts/:id/statistics')
export class ContactStatisticController {
  constructor(
    private readonly contactStatisticService: ContactStatisticService
  ) {}

  @Patch('viewed')
  async incrementViewed(@Id() id: string) {
    return this.contactStatisticService.incrementViewed(id);
  }

  @Patch('shared')
  async incrementShared(@Id() id: string) {
    return this.contactStatisticService.incrementShared(id);
  }

  @Patch('scanned')
  async incrementScanned(@Id() id: string) {
    return this.contactStatisticService.incrementScanned(id);
  }
}
