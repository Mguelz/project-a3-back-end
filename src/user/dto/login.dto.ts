import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsEmail,
  Length,
  Matches,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateLoginDto {
  @IsOptional()
  @IsNumber()
  id_login: number;

  @IsString()
  @Length(1, 4, { message: 'O ID do login deve ter entre 1 e 4 caracteres' })
  id_perfil: number;

  @IsOptional()
  @IsNumber()
  id_carrinhoCabeca: number;

  @IsString()
  @Length(11, 14, { message: 'O CPF deve ter entre 11 e 14 caracteres' })
  @Matches(/^\d{11}$/, { message: 'O CPF deve conter exatamente 11 dígitos' })
  cpf: string;

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

  @IsString()
  @Length(2, 40, { message: 'O nome deve ter entre 2 e 40 caracteres' })
  nome: string;

  @IsOptional()
  @IsDateString()
  data_nascimento: Date;
}

export class UpdateLoginDto extends PartialType(CreateLoginDto) {}
