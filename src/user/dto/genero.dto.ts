import { IsString, IsNumber, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateGeneroDto {
  @IsNumber()
  id_genero: number;

  @IsString()
  @Length(1, 100, { message: 'A descrição deve ter entre 1 e 100 caracteres' })
  descricao: string;
}

export class UpdateCatalogoDto extends PartialType(CreateGeneroDto) {}
