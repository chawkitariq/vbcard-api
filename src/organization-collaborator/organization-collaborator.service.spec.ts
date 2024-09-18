import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationCollaboratorService } from './organization-collaborator.service';

describe('OrganizationCollaboratorService', () => {
  let service: OrganizationCollaboratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationCollaboratorService],
    }).compile();

    service = module.get<OrganizationCollaboratorService>(OrganizationCollaboratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
