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
  @JoinTable()
  // name: 'catalogo_genero',
  // joinColumn: { name: 'id_catalogo', referencedColumnName: 'id_catalogo' },
  // inverseJoinColumn: { name: 'id_genero', referencedColumnName: 'id_genero' },
  // )
  generos: GeneroEntity[];

  @OneToMany(
    () => CarrinhoItensEntity,
    (carrinhoItens) => carrinhoItens.catalogos,
  )
  catalogoItens: CarrinhoItensEntity[];
}
