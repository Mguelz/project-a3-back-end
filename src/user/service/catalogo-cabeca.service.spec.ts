import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoCabecaService } from './catalogo-cabeca.service';

describe('CatalogoCabecaService', () => {
  let service: CatalogoCabecaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogoCabecaService],
    }).compile();

    service = module.get<CatalogoCabecaService>(CatalogoCabecaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
