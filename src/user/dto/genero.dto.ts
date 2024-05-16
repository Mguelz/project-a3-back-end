import { IsString, IsNumber, Length } from 'class-validator';

export class GeneroDto {
  @IsNumber()
  id_genero: number;

  @IsString()
  @Length(1, 100, { message: 'A descrição deve ter entre 1 e 100 caracteres' })
  descricao: string;
}
