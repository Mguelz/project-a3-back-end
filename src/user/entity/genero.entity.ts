import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CatalogoCabecaEntity } from '../entity/catalogo-cabeca.entity';

@Entity()
export class GeneroEntity {
  @PrimaryGeneratedColumn()
  id_genero: number;

  @Column({ length: 20 })
  descricao: string;

  @ManyToMany(() => CatalogoCabecaEntity, (catalogo) => catalogo.generos)
  catalogos: CatalogoCabecaEntity[];
}
