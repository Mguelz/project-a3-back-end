import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CarrinhoCabecaEntity } from '../entity/carrinho-cabeca.entity';

@Entity()
export class CarrinhoItensEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CarrinhoCabecaEntity, (carrinhoCabeca) => carrinhoCabeca.itens)
  @JoinColumn()
  carrinhoCabeca: CarrinhoCabecaEntity;

  @Column('decimal', { precision: 7, scale: 2 })
  preco: number;

  @Column('int')
  quantidade: number;
}
