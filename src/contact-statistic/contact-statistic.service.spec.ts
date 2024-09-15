import { Test, TestingModule } from '@nestjs/testing';
import { ContactStatisticService } from './contact-statistic.service';

describe('ContactStatisticService', () => {
  let service: ContactStatisticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactStatisticService],
    }).compile();

    service = module.get<ContactStatisticService>(ContactStatisticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
