import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CatalogoCabecaEntity } from '../entity/catalogo-cabeca.entity';

@Entity()
export class GeneroEntity {
  @PrimaryGeneratedColumn()
  id_genero: number;

  @Column({ length: 20 })
  nome: string;

  // @ManyToMany(() => CatalogoCabecaEntity, (catalogo) => catalogo.generos)
  // catalogos: CatalogoCabecaEntity[];

  @OneToMany(() => CatalogoCabecaEntity, (catalogo) => catalogo.genero)
  catalogos: CatalogoCabecaEntity[];
}
