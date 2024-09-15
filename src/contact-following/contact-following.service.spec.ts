import { Test, TestingModule } from '@nestjs/testing';
import { ContactFollowingService } from './contact-following.service';

describe('ContactFollowingService', () => {
  let service: ContactFollowingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactFollowingService],
    }).compile();

    service = module.get<ContactFollowingService>(ContactFollowingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
