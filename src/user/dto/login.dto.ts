import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateLoginDto {
  @IsEmail()
  @Length(5, 40, {
    message: 'Insira um e-mail válido e/ou que ainda não tenha sido cadastrado',
  })
  @ApiProperty({ description: 'E-mail' })
  email: string;

  @IsString()
  @Length(6, 60, { message: 'A senha deve ter entre 6 e 30 caracteres' })
  @ApiProperty({ description: 'Senha' })
  senha: string;
}

export class UpdateLoginDto extends PartialType(CreateLoginDto) {}
