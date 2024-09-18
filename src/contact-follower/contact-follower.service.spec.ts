import { Test, TestingModule } from '@nestjs/testing';
import { ContactFollowerService } from './contact-follower.service';

describe('ContactFollowerService', () => {
  let service: ContactFollowerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactFollowerService],
    }).compile();

    service = module.get<ContactFollowerService>(ContactFollowerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
