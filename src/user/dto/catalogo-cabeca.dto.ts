import { IsNumber, IsString, IsDecimal, IsInt } from 'class-validator';
import { GeneroDto } from './genero.dto';

export class CatalogoCabecaDto {
  @IsNumber()
  id_catalogo: number;

  id_genero: GeneroDto; // Usar o DTO correspondente se o relacionamento exigir

  @IsString()
  descricao: string;

  @IsString()
  iamgem: string;

  @IsDecimal({ decimal_digits: '7,2' })
  preco_unitario: number;

  @IsDecimal({ decimal_digits: '7,2' })
  disopnivel: number;

  @IsInt()
  vendido: number;
}
