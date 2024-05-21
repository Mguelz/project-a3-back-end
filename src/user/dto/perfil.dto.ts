import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreatePerfilDto {
  @IsOptional()
  id_login?: number;

  @IsString()
  @Length(8, 40, { message: 'O e-mail deve ter entre 8 e 40 caracteres' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString()
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'A senha deve ter pelo menos 8 caracteres, incluindo: uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  })
  senha: string;
  id_perfil: number | FindOperator<number>;
}

export class UpdatePerfilDto extends PartialType(CreatePerfilDto) {}
