import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GeneroEntity } from './genero.entity';

@Entity()
export class CatalogoCabecaEntity {
  @PrimaryGeneratedColumn()
  id_catalogo: number;

  @Column({ length: 40 })
  descricao: string;

  @Column({ length: 100, nullable: true })
  iamgem?: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  preco_unitario: number;

  @Column({ type: 'int' })
  disponivel: number;

  @Column({ type: 'int' })
  vendido: number;

  @ManyToMany(() => GeneroEntity, (genero) => genero.catalogos)
  @JoinTable()
  generos: GeneroEntity[];
}
