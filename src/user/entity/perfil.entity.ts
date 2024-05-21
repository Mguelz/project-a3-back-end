import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LoginEntity } from '../entity/login.entity';
import { CarrinhoEntity } from './carrinho-cabeca.entity';

@Entity()
export class PerfilEntity {
  @PrimaryGeneratedColumn()
  id_perfil: number;

  @Column({ length: 14 })
  cpf: string;

  @Column({ length: 40 })
  nome: string;

  @Column({ length: 40 })
  data_nascimento: Date;

  @Column({ length: 40 })
  cargo: string;

  @OneToOne(() => LoginEntity, (login) => login.perfil)
  login: LoginEntity;

  @OneToOne(() => CarrinhoEntity, (carrinho) => carrinho.login)
  carrinhoCabeca: CarrinhoEntity;
}
