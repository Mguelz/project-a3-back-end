import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGeneroDto {
  @IsString()
  @Length(3, 30, {
    message: 'O nome do gênero deve ter entre 3 e 30 caracteres',
  })
  @ApiProperty({ description: 'Nome do Genero' })
  nome: string;
}

export class UpdateGeneroDto extends PartialType(CreateGeneroDto) {}
