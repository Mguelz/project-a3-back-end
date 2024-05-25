import { Test, TestingModule } from '@nestjs/testing';
import { CarrinhoCabecaController } from './carrinho-cabeca.controller';

describe('CarrinhoCabecaController', () => {
  let controller: CarrinhoCabecaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrinhoCabecaController],
    }).compile();

    controller = module.get<CarrinhoCabecaController>(CarrinhoCabecaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
