import { Test, TestingModule } from '@nestjs/testing';
import { VcardService } from './vcard.service';

describe('VcardService', () => {
  let service: VcardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VcardService],
    }).compile();

    service = module.get<VcardService>(VcardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
