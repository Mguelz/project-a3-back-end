import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LoginEntity } from '../entity/login.entity';
import { CarrinhoCabecaEntity } from './carrinho-cabeca.entity';

@Entity()
export class PerfilEntity {
  @PrimaryGeneratedColumn()
  id_perfil: number;

  @Column({ length: 14 })
  cpf: string;

  @Column({ length: 40 })
  nome: string;

  @Column()
  data_nascimento: Date;

  @Column({ length: 40 })
  cargo: string;

  @OneToOne(() => LoginEntity, (login) => login.perfil)
  @JoinColumn()
  login: LoginEntity;

  @OneToMany(() => CarrinhoCabecaEntity, (carrinho) => carrinho.perfil)
  @JoinColumn()
  carrinhoCabeca: CarrinhoCabecaEntity;
}
