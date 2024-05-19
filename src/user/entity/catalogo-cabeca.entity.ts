import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GeneroEntity } from './genero.entity';
import { IsDecimal, IsOptional } from 'class-validator';

@Entity()
export class CatalogoCabecaEntity {
  @PrimaryGeneratedColumn()
  id_catalogo: number;

  @Column({ length: 40 })
  descricao: string;

  @Column({ length: 100, nullable: true })
  iamgem: string;

  @IsOptional()
  @IsDecimal(
    { decimal_digits: '7,2' },
    { message: 'O preço unitário deve ser um número decimal' },
  )
  preco_unitario?: number;

  @Column({ type: 'int' })
  disponivel: number;

  @Column({ type: 'int' })
  vendido: number;

  @ManyToMany(() => GeneroEntity, (genero) => genero.catalogos)
  @JoinTable()
  generos: GeneroEntity[];
}
