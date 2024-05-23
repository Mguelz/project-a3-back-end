import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { CreateCarrinhoItensDto } from './carrinho-itens.dto';

export class CreateCarrinhoCabecaDto {
  @IsInt()
  perfilId?: number;

  @Type(() => CreateCarrinhoItensDto)
  itens: CreateCarrinhoItensDto[];
}

export class UpdateCarrinhoCabecaDto extends PartialType(
  CreateCarrinhoCabecaDto,
) {}
