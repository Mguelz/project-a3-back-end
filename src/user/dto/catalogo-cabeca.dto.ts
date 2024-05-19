import {
  IsNumber,
  IsString,
  IsDecimal,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsOptional,
  Length,
} from 'class-validator';
import { CreateGeneroDto } from './genero.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateCatalogoDto {
  @IsNumber()
  @Length(1, 5, { message: 'O ID do login deve ter entre 1 e 5 caracteres' })
  id_catalogo: number;

  @IsString()
  descricao: string;

  @IsOptional()
  @IsString()
  iamgem: string;

  @IsDecimal({ decimal_digits: '7,2' })
  preco_unitario: number;

  @IsNumber()
  disponivel: number;

  @IsNumber()
  vendido: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateGeneroDto)
  generos: CreateGeneroDto[];
}

export class UpdateCatalogoDto extends PartialType(CreateCatalogoDto) {}
