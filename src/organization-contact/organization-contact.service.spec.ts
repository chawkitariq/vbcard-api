import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationContactService } from './organization-contact.service';

describe('OrganizationContactService', () => {
  let service: OrganizationContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationContactService],
    }).compile();

    service = module.get<OrganizationContactService>(OrganizationContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
