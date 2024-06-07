import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateIngressoDto {
  @IsString()
  @Length(3, 40, {
    message: 'O nome do ingresso deve ter entre 3 a 40 caracteres',
  })
  nome: string;

  @IsInt()
  quantidade: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'O preço do ingresso deve ser um número com no máximo 2 casas decimais',
    },
  )
  @Min(0, { message: 'O preço do ingresso deve ser maior ou igual a 0' })
  preco_unitario: number;

  @IsNumber()
  catalogoIdCatalogo: number;
}

export class UpdateIngressoDto extends PartialType(CreateIngressoDto) {}
