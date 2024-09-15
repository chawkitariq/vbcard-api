import { Test, TestingModule } from '@nestjs/testing';
import { ContactStatisticController } from './contact-statistic.controller';

describe('ContactStatisticController', () => {
  let controller: ContactStatisticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactStatisticController],
    }).compile();

    controller = module.get<ContactStatisticController>(ContactStatisticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
