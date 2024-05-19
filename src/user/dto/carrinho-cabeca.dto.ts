import { IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLoginDto } from '../dto/login.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCarCabDto {
  @IsNumber()
  id_carrinhoCabeca: number;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateLoginDto)
  id_login: CreateLoginDto;

  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => CreateCarCabDto)
  itens: CreateCarCabDto[];
}

export class UpdateCarCabDto extends PartialType(CreateCarCabDto) {}
