import { Test, TestingModule } from '@nestjs/testing';
import { CarrinhoItensService } from './carrinho-itens.service';

describe('CarrinhoItensService', () => {
  let service: CarrinhoItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarrinhoItensService],
    }).compile();

    service = module.get<CarrinhoItensService>(CarrinhoItensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
