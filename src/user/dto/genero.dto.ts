import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length } from 'class-validator';

export class CreateGeneroDto {
  @IsString()
  @Length(3, 30, { message: 'O nome do gênero deve ter entre 3 e 30 caracteres' })
  nome: string;
}

export class UpdateGeneroDto extends PartialType(CreateGeneroDto) {}
