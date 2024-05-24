import { Test, TestingModule } from '@nestjs/testing';
import { CarrinhoCabecaService } from './carrinho-cabeca.service';

describe('CarrinhoCabecaService', () => {
  let service: CarrinhoCabecaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarrinhoCabecaService],
    }).compile();

    service = module.get<CarrinhoCabecaService>(CarrinhoCabecaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
