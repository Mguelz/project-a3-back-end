import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsInt, IsNumber } from 'class-validator';
import { CreateCarrinhoItensDto } from './carrinho-itens.dto';

export class CreateCarrinhoCabecaDto {
  @IsNumber()
  perfilIdPerfil?: number;

  @IsNumber()
  total: number;

  // essa relação deve ter somente no dto do carrinho-item
  // @Type(() => CreateCarrinhoItensDto)
  // itens: CreateCarrinhoItensDto[];
}

export class UpdateCarrinhoCabecaDto extends PartialType(
  CreateCarrinhoCabecaDto,
) { }
