import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsString,
  Length,
  IsDateString,
  IsOptional,
  ValidateNested,
  Matches,
  IsEmail,
} from 'class-validator';
import { CreatePerfilDto } from './perfil.dto';

export class CreateLoginDto {
  @IsOptional()
  id_perfil?: number;

  // @IsString()
  // @Length(2, 40, { message: 'O nome deve ter entre 2 e 40 caracteres' })
  // nome: string;

  // @IsString()
  // @Length(11, 14, { message: 'O CPF deve ter entre 11 e 14 caracteres' })
  // @Matches(/^\d{11}$/, { message: 'O CPF deve conter exatamente 11 dígitos' })
  // cpf: string;

  // @IsDateString()
  // data_nascimento: Date;

  // @IsString()
  // @Length(2, 40, { message: 'O cargo deve ter entre 2 e 40 caracteres' })
  // cargo: string;

  @IsOptional()
  @IsEmail()
  @Length(8, 40, { message: 'O e-mail deve ter entre 8 e 40 caracteres' })
  email: string;

  @IsString()
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'A senha deve ter pelo menos 8 caracteres, incluindo: uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  })
  senha: string;
}

export class UpdateLoginDto extends PartialType(CreateLoginDto) {}
