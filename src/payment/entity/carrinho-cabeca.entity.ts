import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PerfilEntity } from 'src/user/entity/perfil.entity';
import { CarrinhoItensEntity } from './carrinho-itens.entity';

@Entity({name: 'carrinho_cabeca'})
export class CarrinhoCabecaEntity {
  @PrimaryGeneratedColumn()
  id_carrinho: number;

  @ManyToOne(() => PerfilEntity, (perfil) => perfil.carrinhos)
  perfil: PerfilEntity;

  @OneToMany(() => CarrinhoItensEntity, (item) => item.carrinho)
  itens: CarrinhoItensEntity[];
  
}
