import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CatalogoEntity } from './catalogo-cabeca.entity';
import { CarrinhoItensEntity } from 'src/payment/entity/carrinho-itens.entity';

@Entity({ name: 'ingresso' })
export class IngressoEntity {
  @PrimaryGeneratedColumn()
  id_ingresso: number;

  @Column({ length: 50 })
  nome: string;

  @Column({ type: 'int' })
  quantidade: number;

  @Column({ type: 'numeric', precision: 7, scale: 2 })
  preco_unitario: number;

  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.ingressos)
  catalogo: CatalogoEntity; // [] - não precisa / ingresso pertence a 1 catalogo

  @OneToMany(() => CarrinhoItensEntity, (itens) => itens.carrinho)
  itens: CarrinhoItensEntity;
}
