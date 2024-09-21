import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationContactController } from './organization-contact.controller';
import { OrganizationContactService } from './organization-contact.service';

describe('OrganizationContactController', () => {
  let controller: OrganizationContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationContactController],
      providers: [OrganizationContactService],
    }).compile();

    controller = module.get<OrganizationContactController>(OrganizationContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
