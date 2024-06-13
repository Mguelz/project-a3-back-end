import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoService } from './catalogo-cabeca.service';

describe('CatalogoCabecaService', () => {
  let service: CatalogoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogoService],
    }).compile();

    service = module.get<CatalogoService>(CatalogoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
