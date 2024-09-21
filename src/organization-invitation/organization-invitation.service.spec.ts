import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationInvitationService } from './organization-invitation.service';

describe('OrganizationInvitationService', () => {
  let service: OrganizationInvitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationInvitationService],
    }).compile();

    service = module.get<OrganizationInvitationService>(OrganizationInvitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
