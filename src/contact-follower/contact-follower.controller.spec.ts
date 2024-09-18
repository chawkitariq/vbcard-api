import { Test, TestingModule } from '@nestjs/testing';
import { ContactFollowerController } from './contact-follower.controller';
import { ContactFollowerService } from './contact-follower.service';

describe('ContactFollowerController', () => {
  let controller: ContactFollowerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactFollowerController],
      providers: [ContactFollowerService],
    }).compile();

    controller = module.get<ContactFollowerController>(ContactFollowerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
