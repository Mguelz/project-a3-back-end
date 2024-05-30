import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { CreateGeneroDto } from './genero.dto';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCarrinhoItensDto } from './carrinho-itens.dto';

export class CreateCatalogoDto {
  // @IsNumber()
  // @Min(1, { message: 'O ID do Catalogo deve ser no mínimo 1 dígito' })
  // @Max(999999, { message: 'O ID do Catalogo deve ter no máximo 6 dígitos' })
  // id_catalogo?: number;

  @IsString()
  @Length(2, 40, { message: 'A descrição deve ter entre 2 e 40 caracteres' })
  descricao: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'O preço unitário deve ser um número com no máximo 2 casas decimais',
    },
  )
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

  // @IsNumber()
  // generos: CreateGeneroDto[];

  @IsNumber()
  catalogosIdCatalogo?: number;
  // @IsNumber()
  // itens: CreateCarrinhoItensDto[];
  // itens: CreateCarrinhoItensDto[];
}

export class UpdateCatalogoDto extends PartialType(CreateCatalogoDto) { }
