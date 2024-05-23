import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { CreateLoginDto } from './login.dto';

export class CreatePerfilDto {
  @IsNumber()
  @Min(1, { message: 'O ID do Perfil deve ser no mínimo 1 dígito' })
  @Max(5, { message: 'O ID do Perfil deve ter no máximo 5 dígitos' })
  id_perfil?: number;

  @IsString()
  @Length(3, 40, { message: 'O nome deve ter entre 3 e 40 caracteres' })
  nome: string;

  @IsString()
  @Length(11, 11, {
    message: 'O CPF deve ter exatamente 11 caracteres (somente numeros)',
  })
  cpf: string;

  @IsDateString(
    {},
    { message: 'Data de nascimento deve ser uma data válida (aaaa-mm-dd)' },
  )
  data_nascimento: Date;

  @IsString()
  @Length(3, 30, { message: 'O cargo deve ter entre 3 e 30 caracteres' })
  cargo: string;

  @IsNumber()
  @Type(() => CreateLoginDto)
  login: CreateLoginDto;
}

export class UpdatePerfilDto extends PartialType(CreatePerfilDto) {}
