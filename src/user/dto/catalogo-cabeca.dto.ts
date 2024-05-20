import {
  IsNumber,
  IsString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsOptional,
  Length,
  Min,
  Max,
} from 'class-validator';
import { CreateGeneroDto } from './genero.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateCatalogoDto {
  // @IsNumber()
  // @Length(1, 5, { message: 'O ID do login deve ter entre 1 e 5 caracteres' })
  // id_catalogo: number;

  @IsNumber()
  @Min(1, { message: 'O ID do catálogo deve ser no mínimo 1' })
  @Max(5, { message: 'O ID do catálogo deve ter no máximo 5 dígitos' })
  id_catalogo: number;

  @IsString()
  @Length(1, 100, { message: 'A descrição deve ter entre 1 e 100 caracteres' })
  descricao: string;

  @IsOptional()
  @IsString()
  iamgem?: string;

  // @IsDecimal({ decimal_digits: '7,2' })
  // preco_unitario: number;
  @IsNumber()
  @Min(0, { message: 'O preço unitário deve ser no mínimo 0' })
  @Max(99999.99, { message: 'O preço unitário deve ser no máximo 99999.99' })
  preco_unitario: number;

  // @IsNumber()
  // disponivel: number;
  @IsNumber()
  @Min(0, { message: 'A quantidade disponível deve ser no mínimo 0' })
  @Max(1000000, { message: 'A quantidade disponível deve ser no máximo 1.000.000 (um millão)',
  })
  disponivel: number;

  // @IsNumber()
  // vendido: number;
  @IsNumber()
  @Min(0, { message: 'A quantidade vendida deve ser no mínimo 0' })
  @Max(1000000, { message: 'A quantidade disponível deve ser no máximo 1.000.000 (um millão)',
  })
  vendido: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateGeneroDto)
  generos: CreateGeneroDto[];
}

export class UpdateCatalogoDto extends PartialType(CreateCatalogoDto) {}
