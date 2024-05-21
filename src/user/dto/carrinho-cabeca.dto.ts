import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCarrihnoDto {
  @IsOptional()
  id_perfil?: number;

  @IsString()
  @Length(2, 40, { message: 'O nome deve ter entre 2 e 40 caracteres' })
  nome: string;

  @IsString()
  @Length(11, 14, { message: 'O CPF deve ter entre 11 e 14 caracteres' })
  cpf: string;

  @IsDateString()
  data_nascimento: Date;

  @IsString()
  @Length(2, 40, { message: 'O cargo deve ter entre 2 e 40 caracteres' })
  cargo: string;
}

export class UpdateCarrinhoDto extends PartialType(CreateCarrihnoDto) {}
