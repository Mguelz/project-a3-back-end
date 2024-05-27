import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LoginEntity } from '../entity/login.entity';
import { CarrinhoCabecaEntity } from './carrinho-cabeca.entity';

@Entity()
export class PerfilEntity {
  @PrimaryGeneratedColumn()
  @OneToOne(() => LoginEntity, (login) => login.perfil)
  id_perfil: number;

  @Column({ length: 40 })
  nome: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ type: 'date' })
  data_nascimento: Date;

  @Column({ length: 30 })
  cargo: string;

  // @OneToOne(() => LoginEntity, (login) => login.perfil)
  // login: LoginEntity;

  @OneToMany(() => CarrinhoCabecaEntity, (carrinho) => carrinho.perfil)
  carrinhos: CarrinhoCabecaEntity[];
}
