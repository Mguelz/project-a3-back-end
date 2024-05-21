import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsString,
  Length,
  IsDateString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreatePerfilDto } from './perfil.dto';

export class CreateLoginDto {
  @IsOptional()
  id_perfil?: number; // Adicione a propriedade id_perfil

  @IsString()
  @Length(2, 40, { message: 'O nome deve ter entre 2 e 40 caracteres' })
  nome: string;

  @IsString()
  @Length(11, 14, { message: 'O CPF deve ter entre 11 e 14 caracteres' })
  cpf: string;

  @IsOptional()
  @IsDateString()
  data_nascimento: Date;

  @IsString()
  @Length(2, 40, { message: 'O cargo deve ter entre 2 e 40 caracteres' })
  cargo: string;

  @ValidateNested()
  @Type(() => CreatePerfilDto) // Certifique-se de usar o tipo correto aqui
  perfil: CreatePerfilDto;
}

export class UpdateLoginDto extends PartialType(CreateLoginDto) {}
