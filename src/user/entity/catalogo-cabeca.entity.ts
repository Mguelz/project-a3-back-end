import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GeneroEntity } from './genero.entity';

@Entity()
export class CatalogoCabecaEntity {
  @PrimaryGeneratedColumn()
  id_catalogo: number;

  @OneToOne(() => GeneroEntity)
  @JoinColumn()
  id_genero: GeneroEntity;

  @Column({ length: 40 })
  descricao: string;

  @Column({ length: 100 })
  iamgem: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  preco_unitario: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  disopnivel: number;

  @Column({ type: 'tinyint' })
  vendido: number;
}
