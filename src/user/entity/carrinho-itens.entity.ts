import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarrinhoCabecaEntity } from './carrinho-cabeca.entity';
import { CatalogoCabecaEntity } from './catalogo-cabeca.entity';

@Entity()
export class CarrinhoItensEntity {
  @PrimaryGeneratedColumn()
  id_carrinho_item: number;

  @Column({ type: 'numeric', precision: 7, scale: 2 })
  desconto: number;

  @Column({ type: 'numeric', precision: 7, scale: 2 })
  preco_item: number;

  @Column({ type: 'int' })
  quantidade: number;

  @Column({type: 'numeric', precision:7, scale:2})
  valor_total: number;

  @ManyToOne(() => CarrinhoCabecaEntity, (carrinho) => carrinho.itens)
  @JoinColumn({ name: 'id_carrinho' })
  carrinho: CarrinhoCabecaEntity;

  @ManyToOne(() => CatalogoCabecaEntity, (catalogo) => catalogo)
  @JoinColumn()
  catalogo: CatalogoCabecaEntity;

  @Column('Int')
  id_carrinho: number;

  @Column('Int')
  catalogoIdCatalogo: number;
}
