import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNumber,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { CreatePerfilDto } from './perfil.dto';

export class CreateLoginDto {

  @IsEmail()
  @Length(5, 40, { message: 'O email deve ter entre 5 e 40 caracteres' })
  email: string;

  @IsString()
  @Length(6, 30, { message: 'A senha deve ter entre 6 e 30 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:'a senha deve ter pelo menos 6 caracteres, incluindo uma pelo menos: uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  })
  senha: string;


}

export class UpdateLoginDto extends PartialType(CreateLoginDto) {}
