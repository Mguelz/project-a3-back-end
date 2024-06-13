import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePerfilDto {

  @IsString()
  @Length(3, 40, { message: 'O nome deve ter entre 3 e 40 caracteres' })
  @ApiProperty({ description: 'Nome do Usuario' })
  nome: string;

  @IsString()
  @Length(11, 11, {
    message: 'O CPF deve ter exatamente 11 caracteres (somente numeros)',
  })
  @ApiProperty({ description: 'CPF' })
  cpf?: string;

  @IsDateString(
    {},
    { message: 'Data de nascimento deve ser uma data válida (aaaa-mm-dd)' },
  )
  @ApiProperty({ description: 'Data de nascimento' })
  data_nascimento: Date;

  @IsString()
  @Length(3, 30, { message: 'O cargo deve ter entre 3 e 30 caracteres' })
  @ApiProperty({ description: 'Cargo' })
  cargo?: string;

  @IsNumber()
  @ApiProperty({ description: 'Login ID' })
  loginIdLogin?: number;
}

export class UpdatePerfilDto extends PartialType(CreatePerfilDto) {}
