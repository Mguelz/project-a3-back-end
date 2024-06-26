import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LoginEntity } from '../entity/login.entity';
import { CarrinhoCabecaEntity } from 'src/payment/entity/carrinho-cabeca.entity';

@Entity({ name: 'perfil' })
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

  @OneToOne(() => LoginEntity, (login) => login.perfil)
  @JoinColumn()
  login: LoginEntity;

  @OneToMany(() => CarrinhoCabecaEntity, (carrinho) => carrinho.perfil)
  carrinhos: CarrinhoCabecaEntity[];
}
