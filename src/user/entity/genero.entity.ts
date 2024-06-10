import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CatalogoCabecaEntity } from '../entity/catalogo-cabeca.entity';

@Entity({name: 'genero'})
export class GeneroEntity {
  @PrimaryGeneratedColumn()
  id_genero: number;

  @Column({ length: 20 })
  nome: string;


  @OneToMany(() => CatalogoCabecaEntity, (catalogo) => catalogo.genero)
  catalogos: CatalogoCabecaEntity[];
}
