import { IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LoginDto } from './login.dto';

export class CarrinhoCabecaDto {
  @IsNumber()
  id_carrinhoCabeca: number;

  @IsObject()
  @ValidateNested()
  @Type(() => LoginDto)
  id_login: LoginDto;

  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => CarrinhoCabecaDto)
  itens: CarrinhoCabecaDto[];
}
