import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreatePerfilDto {
  @IsNumber()
  @Length(1, 4, { message: 'O ID do perfil deve ter entre 1 e 4 caracteres' })
  id_perfil: number;

  @IsString()
  @Length(3, 100, { message: 'A descrição deve ter entre 3 e 100 caracteres' })
  descricao: string;
}

export class UpdatePerfilDto extends PartialType(CreatePerfilDto) {}
