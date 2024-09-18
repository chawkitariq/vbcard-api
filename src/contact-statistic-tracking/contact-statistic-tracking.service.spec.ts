import { Test, TestingModule } from '@nestjs/testing';
import { ContactStatisticTrackingService } from './contact-statistic-tracking.service';

describe('ContactStatisticTrackingService', () => {
  let service: ContactStatisticTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactStatisticTrackingService],
    }).compile();

    service = module.get<ContactStatisticTrackingService>(ContactStatisticTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
