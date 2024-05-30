import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, Max, Min } from 'class-validator';

export class CreateCarrinhoItensDto {
  // @IsNumber()
  // @Min(1, { message: 'O ID do Login deve ser no mínimo 1 dígito' })
  // @Max(99999, { message: 'O ID do Login deve ter no máximo 5 dígitos' })
  // carrinhoId?: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O desconto deve ser um número com no máximo 2 casas decimais' },
  )
  @Min(0, { message: 'O desconto deve ser maior ou igual a 0' })
  desconto?: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'O preço do item deve ser um número com no máximo 2 casas decimais',
    },
  )
  @Min(0, { message: 'O preço do item deve ser maior ou igual a 0' })
  preco_item: number;

  @IsNumber()
  @Min(1, { message: 'A quantidade deve ser maior ou igual a 1' })
  quantidade: number;

  @IsNumber()
  carrinhoIdCarrinho?: number;

  @IsNumber()
  catalogosIdCatalogo?: number;
}

export class UpdateCarrinhoItensDto extends PartialType(
  CreateCarrinhoItensDto,
) {}
