import { IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCarrihnoDto {
  @IsNumber()
  id_carrinhoCabeca: number;
}

export class UpdateCarrinhoDto extends PartialType(CreateCarrihnoDto) {}
