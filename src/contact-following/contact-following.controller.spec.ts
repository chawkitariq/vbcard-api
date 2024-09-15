import { Test, TestingModule } from '@nestjs/testing';
import { ContactFollowingController } from './contact-following.controller';
import { ContactFollowingService } from './contact-following.service';

describe('ContactFollowingController', () => {
  let controller: ContactFollowingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactFollowingController],
      providers: [ContactFollowingService],
    }).compile();

    controller = module.get<ContactFollowingController>(ContactFollowingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
