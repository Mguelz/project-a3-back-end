import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

export class CreateCarrinhoCabecaDto {
  @IsNumber()
  perfilIdPerfil?: number;

  // @Type(() => CreateCarrinhoItensDto)
  // itens: CreateCarrinhoItensDto[];
}

export class UpdateCarrinhoCabecaDto extends PartialType(
  CreateCarrinhoCabecaDto,
) {}
