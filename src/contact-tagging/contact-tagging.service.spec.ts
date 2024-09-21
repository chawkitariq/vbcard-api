import { Test, TestingModule } from '@nestjs/testing';
import { ContactTaggingService } from './contact-tagging.service';

describe('ContactTaggingService', () => {
  let service: ContactTaggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactTaggingService],
    }).compile();

    service = module.get<ContactTaggingService>(ContactTaggingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
