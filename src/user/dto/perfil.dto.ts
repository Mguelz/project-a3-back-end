import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { CreateLoginDto } from './login.dto';

export class CreatePerfilDto {

  @IsString()
  @Length(3, 40, { message: 'O nome deve ter entre 3 e 40 caracteres' })
  nome: string;

  @IsString()
  @Length(11, 11, {
    message: 'O CPF deve ter exatamente 11 caracteres (somente numeros)',
  })
  cpf?: string;

  @IsDateString(
    {},
    { message: 'Data de nascimento deve ser uma data válida (aaaa-mm-dd)' },
  )
  data_nascimento: Date;

  @IsString()
  @Length(3, 30, { message: 'O cargo deve ter entre 3 e 30 caracteres' })
  cargo?: string;

  @IsNumber()
  loginIdLogin?: number;

  @IsNumber()
  carrinhoIdCarrinho?: number;
}

export class UpdatePerfilDto extends PartialType(CreatePerfilDto) {}
