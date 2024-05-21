import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PerfilEntity } from '../entity/perfil.entity';
import { CarrinhoEntity } from './carrinho-cabeca.entity';

@Entity()
export class LoginEntity {
  @PrimaryGeneratedColumn()
  id_login: number;

  @Column({ unique: true, length: 40 })
  email: string;

  @Column({ length: 60 })
  senha: string;

  @OneToOne(() => PerfilEntity)
  @JoinColumn()
  perfil: PerfilEntity;

  @OneToOne(() => CarrinhoEntity)
  @JoinColumn({ name: 'id_carrinhoCabeca' })
  carrinhoCabeca: CarrinhoEntity;
}
