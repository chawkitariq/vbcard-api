import { Test, TestingModule } from '@nestjs/testing';
import { ContactContactTaggingController } from './contact-tagging.controller';
import { ContactContactTaggingService } from './contact-tagging.service';

describe('ContactContactTaggingController', () => {
  let controller: ContactContactTaggingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactContactTaggingController],
      providers: [ContactContactTaggingService],
    }).compile();

    controller = module.get<ContactContactTaggingController>(ContactContactTaggingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
