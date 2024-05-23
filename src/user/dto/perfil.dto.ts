import { PartialType } from '@nestjs/mapped-types';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { CreateLoginDto } from './login.dto';
import { Type } from 'class-transformer';
import { Column } from 'typeorm';

export class CreatePerfilDto {
  @IsString()
  @Length(2, 40, { message: 'O nome deve ter entre 2 e 40 caracteres' })
  nome: string;

  @IsString()
  @Length(11, 14, { message: 'O CPF deve ter entre 11 e 14 caracteres' })
  cpf: string;

  @IsDateString()
  data_nascimento?: Date;

  @IsString()
  @Length(2, 20, { message: 'O cargo deve ter entre 2 e 20 caracteres' })
  cargo: string;
  @IsNumber()
  loginIdLogin: CreateLoginDto;
}

export class UpdatePerfilDto extends PartialType(CreatePerfilDto) { }
