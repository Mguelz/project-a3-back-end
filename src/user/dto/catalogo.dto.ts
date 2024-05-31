import { IsInt, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCatalogoDto {

  @IsString()
  @Length(2, 40, { message: 'A descrição deve ter entre 2 e 40 caracteres' })
  descricao: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O preço unitário deve ser um número com no máximo 2 casas decimais' })
  @Min(0, { message: 'O preço unitário deve ser maior ou igual a 0' })
  preco_unitario: number;

  @IsInt()
  @Min(0, { message: 'A quantidade disponível deve ser maior ou igual a 0' })
  disponivel: number;

  @IsInt()
  @Min(0, { message: 'A quantidade vendida deve ser maior ou igual a 0' })
  vendido: number;

  @IsString()
  @Length(2, 100, {
    message: 'O URL da imagem deve ter entre 2 e 100 caracteres',
  })
  imagem?: string;

  @IsNumber()
  generoIdGenero: number;
}

export class UpdateCatalogoDto extends PartialType(CreateCatalogoDto) {}
