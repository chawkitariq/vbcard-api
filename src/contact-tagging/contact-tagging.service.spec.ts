import { Test, TestingModule } from '@nestjs/testing';
import { ContactContactTaggingService } from './contact-tagging.service';

describe('ContactContactTaggingService', () => {
  let service: ContactContactTaggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactContactTaggingService],
    }).compile();

    service = module.get<ContactContactTaggingService>(ContactContactTaggingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
