import { IsInt, IsNumber, IsString, Length, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatalogoDto {
  @IsString()
  @Length(2, 40, { message: 'A descrição deve ter entre 2 e 40 caracteres' })
  @ApiProperty({ description: 'Descrição do Item' })
  descricao: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'O preço unitário deve ser um número com no máximo 2 casas decimais',
    },
  )
  @Min(0, { message: 'O preço unitário deve ser maior ou igual a 0' })
  @ApiProperty({ description: 'Preço Unitario' })
  preco_unitario: number;

  // @IsInt()
  // @Min(0, { message: 'A quantidade disponível deve ser maior ou igual a 0' })
  // disponivel: number;

  @IsInt()
  @Min(0, { message: 'A quantidade vendida deve ser maior ou igual a 0' })
  @ApiProperty({ description: 'Quantidade de ingressos vendidos' })
  vendido: number;

  @IsString()
  @Length(2, 100, {
    message: 'O URL da imagem deve ter entre 2 e 100 caracteres',
  })
  @ApiProperty({ description: 'Imagem' })
  imagem?: string;

  @IsNumber()
  @ApiProperty({ description: 'Genero ID' })
  generoIdGenero: number;
}

export class UpdateCatalogoDto extends PartialType(CreateCatalogoDto) {}
