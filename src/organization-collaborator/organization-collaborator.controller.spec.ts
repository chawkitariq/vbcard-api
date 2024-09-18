import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationCollaboratorController } from './organization-collaborator.controller';
import { OrganizationCollaboratorService } from './organization-collaborator.service';

describe('OrganizationCollaboratorController', () => {
  let controller: OrganizationCollaboratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationCollaboratorController],
      providers: [OrganizationCollaboratorService],
    }).compile();

    controller = module.get<OrganizationCollaboratorController>(OrganizationCollaboratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
