import { Test, TestingModule } from '@nestjs/testing';
import { ContactTagController } from './contact-tag.controller';
import { ContactTagService } from './contact-tag.service';

describe('ContactTagController', () => {
  let controller: ContactTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactTagController],
      providers: [ContactTagService],
    }).compile();

    controller = module.get<ContactTagController>(ContactTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
