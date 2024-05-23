import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PerfilEntity } from './perfil.entity';
import { CarrinhoItensEntity } from './carrinho-itens.entity';

// esta classe esta faltando o relacionamento com as outras classes
@Entity()
export class CarrinhoCabecaEntity {
  @PrimaryGeneratedColumn()
  id_carrinho: number;

  @ManyToOne(() => PerfilEntity, (perfil) => perfil.carrinhos)
  perfil: PerfilEntity;

  @OneToMany(() => CarrinhoItensEntity, (carrinhoItem) => carrinhoItem.carrinho)
  itens: CarrinhoItensEntity[];
  // @PrimaryGeneratedColumn()
  // id_carrinho: number;

  // @OneToOne(() => PerfilEntity, (perfil) => perfil.carrinhoCabeca)
  // perfil: PerfilEntity;

  // @OneToOne(() => LoginEntity, (login) => login.carrinhoCabeca)
  // login: LoginEntity;
}
