import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationInvitationController } from './organization-invitation.controller';
import { OrganizationInvitationService } from './organization-invitation.service';

describe('OrganizationInvitationController', () => {
  let controller: OrganizationInvitationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationInvitationController],
      providers: [OrganizationInvitationService],
    }).compile();

    controller = module.get<OrganizationInvitationController>(OrganizationInvitationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
