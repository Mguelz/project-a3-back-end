import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarrinhoCabecaDto {
  @IsNumber()
  @ApiProperty({ description: 'Perfil ID' })
  perfilIdPerfil?: number;
}

export class UpdateCarrinhoCabecaDto extends PartialType(
  CreateCarrinhoCabecaDto,
) {}
