import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length } from 'class-validator';
export class CreatePerfilDto {
  //   constructor(id_perfil: string, descricao: string) {
  //     this.id_perfil = id_perfil;
  //     this.descricao = descricao;
  //   }

  @IsString()
  @Length(1, 4, { message: 'O ID do perfil deve ter entre 1 e 4 caracteres' })
  id_perfil: string;

  @IsString()
  @Length(3, 100, { message: 'A descrição deve ter entre 3 e 100 caracteres' })
  descricao: string;
}

export class UpdatePerfilDto extends PartialType(CreatePerfilDto) {}
