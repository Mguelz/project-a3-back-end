import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

export class CreateCarrinhoCabecaDto {
  @IsNumber()
  perfilIdPerfil?: number;
}

export class UpdateCarrinhoCabecaDto extends PartialType(
  CreateCarrinhoCabecaDto,
) {}
