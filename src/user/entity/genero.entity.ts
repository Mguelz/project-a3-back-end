import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CatalogoEntity } from '../entity/catalogo-cabeca.entity';

@Entity({name: 'genero'})
export class GeneroEntity {
  @PrimaryGeneratedColumn()
  id_genero: number;

  @Column({ length: 20 })
  nome: string;


  @OneToMany(() => CatalogoEntity, (catalogo) => catalogo.genero)
  catalogos: CatalogoEntity[];
}
