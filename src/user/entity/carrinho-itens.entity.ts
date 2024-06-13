import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarrinhoCabecaEntity } from './carrinho-cabeca.entity';
import { CatalogoEntity } from './catalogo-cabeca.entity';
import { IngressoEntity } from './ingresso.entity';

@Entity({name: 'itens_carrinho'})
export class CarrinhoItensEntity {
  @PrimaryGeneratedColumn()
  id_carrinho_item: number;

  @Column({ type: 'numeric', precision: 7, scale: 2 })
  desconto: number;

  @Column({ type: 'int' })
  quantidade: number;

  @Column({type: 'numeric', precision:7, scale:2})
  valor_final: number;

  @ManyToOne(() => CarrinhoCabecaEntity, (carrinho) => carrinho.itens)
  @JoinColumn({ name: 'id_carrinho' })
  carrinho: CarrinhoCabecaEntity;

  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo)
  @JoinColumn()
  catalogo: CatalogoEntity;

  @Column('Int')
  id_carrinho: number;

  @Column('Int')
  catalogoIdCatalogo: number;

  @ManyToOne(() => IngressoEntity, (ingresso) => ingresso.itens)
  @JoinColumn({ name: 'ingresso_id' })
  ingresso: IngressoEntity;
}
