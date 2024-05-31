import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

export class CreateCarrinhoCabecaDto {
  @IsNumber()
  perfilIdPerfil?: number;

  // @IsNumber()
  // itensIdItens?: number;
}

export class UpdateCarrinhoCabecaDto extends PartialType(
  CreateCarrinhoCabecaDto,
) {}
