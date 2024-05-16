import { IsNumber, IsString, Length } from 'class-validator';
import { GeneroDto } from './genero.dto'; // Importar o DTO do GeneroEntity se necessário

export class CatalogoItensDto {
  @IsNumber()
  id_catalogo: number;

  id_genero: GeneroDto; // Usar o DTO correspondente se o relacionamento exigir

  @IsString()
  @Length(1, 40, { message: 'A descrição deve ter entre 1 e 40 caracteres' })
  descricao: string;

  @IsString()
  @Length(1, 100, {
    message: 'O caminho da imagem deve ter entre 1 e 100 caracteres',
  })
  imagem: string;
}
