import { Test, TestingModule } from '@nestjs/testing';
import { CarrinhoItensController } from './carrinho-itens.controller';

describe('CarrinhoItensController', () => {
  let controller: CarrinhoItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrinhoItensController],
    }).compile();

    controller = module.get<CarrinhoItensController>(CarrinhoItensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
