import { Test, TestingModule } from '@nestjs/testing';
import { ContactTaggingController } from './contact-tagging.controller';
import { ContactTaggingService } from './contact-tagging.service';

describe('ContactTaggingController', () => {
  let controller: ContactTaggingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactTaggingController],
      providers: [ContactTaggingService],
    }).compile();

    controller = module.get<ContactTaggingController>(ContactTaggingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
