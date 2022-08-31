import { Test, TestingModule } from '@nestjs/testing';
import { SuscriptionsController } from './suscriptions.controller';

describe('SuscriptionsController', () => {
  let controller: SuscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuscriptionsController],
    }).compile();

    controller = module.get<SuscriptionsController>(SuscriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
