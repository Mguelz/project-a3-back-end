import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateCarrinhoItensDto {
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O desconto deve ser um número com no máximo 2 casas decimais' },
  )
  @Min(0, { message: 'O desconto deve ser maior ou igual a 0' })
  desconto?: number;

  // @IsNumber(
  //   { maxDecimalPlaces: 2 },
  //   {
  //     message:
  //       'O preço do item deve ser um número com no máximo 2 casas decimais',
  //   },
  // )
  // @Min(0, { message: 'O preço do item deve ser maior ou igual a 0' })
  // preco_item: number;

  // o valor total será calculado diretamente pelo código, não precisa ser validado
  // @IsNumber()
  // valor_total: number;

  @IsNumber()
  @Min(1, { message: 'A quantidade deve ser maior ou igual a 1' })
  quantidade: number;

  @IsNumber()
  catalogoIdCatalogo: number;

  @IsInt()
  id_carrinho: number;

  @IsInt()
  ingressoId: number;
}

export class UpdateCarrinhoItensDto extends PartialType(
  CreateCarrinhoItensDto,
) {}
