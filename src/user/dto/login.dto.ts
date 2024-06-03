import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsString,
  Length,
} from 'class-validator';

export class CreateLoginDto {

  @IsEmail()
  @Length(5, 40, { message: 'Insira um e-mail válido e/ou que ainda não tenha sido cadastrado' })
  email: string;

  @IsString()
  @Length(6, 60, { message: 'A senha deve ter entre 6 e 30 caracteres' })
  // acredito que nao precisa dessa validação pois sera gerado automaticamente
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  //  {
  //   message:'a senha deve ter pelo menos 6 caracteres, incluindo uma pelo menos: uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  // })
  senha: string;


}

export class UpdateLoginDto extends PartialType(CreateLoginDto) {}
