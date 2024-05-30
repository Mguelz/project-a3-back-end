import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateGeneroDto {
  // @IsNumber()
  // @Min(1, { message: 'O ID do Genero deve ser no mínimo 1 dígito' })
  // @Max(99, { message: 'O ID do Genero deve ter no máximo 2 dígitos' })
  // id_genero?: number;

  @IsString()
  @Length(2, 20, { message: 'A descrição deve ter entre 2 e 20 caracteres' })
  descricao: string;
}

export class UpdateGeneroDto extends PartialType(CreateGeneroDto) {}
