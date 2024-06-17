import { CreateCatalogoDto } from './catalogo.dto';

describe('CatalogoDto', () => {
  it('should be defined', () => {
    expect(new CreateCatalogoDto()).toBeDefined();
  });
});
