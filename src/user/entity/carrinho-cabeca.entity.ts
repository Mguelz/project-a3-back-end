import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PerfilEntity } from './perfil.entity';
import { CarrinhoItensEntity } from './carrinho-itens.entity';

@Entity()
export class CarrinhoCabecaEntity {
  @PrimaryGeneratedColumn()
  id_carrinho: number;

  @Column({ type: 'numeric', precision: 7, scale: 2 })
  total: number;

  @ManyToOne(() => PerfilEntity, (perfil) => perfil.carrinhos)
  perfil: PerfilEntity;

  @OneToMany(() => CarrinhoItensEntity, (carrinhoItem) => carrinhoItem.carrinho)
  itens: CarrinhoItensEntity[];
}
