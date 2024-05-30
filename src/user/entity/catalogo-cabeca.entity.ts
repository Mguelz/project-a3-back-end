import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GeneroEntity } from './genero.entity';
import { CarrinhoItensEntity } from './carrinho-itens.entity';

@Entity()
export class CatalogoCabecaEntity {
  @PrimaryGeneratedColumn()
  id_catalogo: number;

  @Column({ length: 40 })
  descricao: string;

  @Column({ type: 'numeric', precision: 7, scale: 2 })
  preco_unitario: number;

  @Column({ type: 'int' })
  disponivel: number;

  @Column({ type: 'int' })
  vendido: number;

  @Column({ length: 100 })
  imagem: string;

  @ManyToMany(() => GeneroEntity, (genero) => genero.catalogos)
  generos: GeneroEntity[];

  @ManyToMany(() => CarrinhoItensEntity, (item) => item.catalogos)
  carrinhoItens: CarrinhoItensEntity[];
}
