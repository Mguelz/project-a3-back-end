import { IsInt, IsNumber, IsPositive } from 'class-validator';
import { CarrinhoCabecaDto } from './carrinho-cabeca.dto';

export class CarrinhoItensDto {
  @IsNumber()
  id: number;

  carrinhoCabeca: CarrinhoCabecaDto; // Use o DTO adequado se o relacionamento exigir

  @IsNumber()
  @IsPositive({ message: 'O preço deve ser um número positivo' })
  preco: number;

  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @IsPositive({ message: 'A quantidade deve ser um número positivo' })
  quantidade: number;
}
