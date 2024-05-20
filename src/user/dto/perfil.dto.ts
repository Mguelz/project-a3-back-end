import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreatePerfilDto {
  @IsNumber()
  @Min(1, { message: 'O ID do perfil deve ser no mínimo 1' })
  @Max(4, { message: 'O ID do perfil deve ter no máximo 4 dígitos' })
  id_perfil: number;

  @IsString()
  @Length(3, 30, { message: 'A descrição deve ter entre 3 e 30 caracteres' })
  descricao: string;
}

export class UpdatePerfilDto extends PartialType(CreatePerfilDto) {}
