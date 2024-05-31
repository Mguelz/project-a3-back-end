import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, Min } from 'class-validator';

export class CreateCarrinhoItensDto {
  @IsNumber()
  carrinhoIdCarrinho: number;

  @IsNumber()
  catalogoIdCatalogo: number;

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
}

export class UpdateCarrinhoItensDto extends PartialType(
  CreateCarrinhoItensDto,
) {}
