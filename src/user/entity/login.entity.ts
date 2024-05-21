import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PerfilEntity } from '../entity/perfil.entity';
import { CarrinhoCabecaEntity } from './carrinho-cabeca.entity';

@Entity()
export class LoginEntity {
  @PrimaryGeneratedColumn()
  id_login: number;

  @Column({ unique: true, length: 40 })
  email: string;

  @Column({ length: 60 })
  senha: string;

  @OneToOne(() => PerfilEntity, (perfil) => perfil.login)
  @JoinColumn()
  perfil: PerfilEntity;

  // @OneToOne(() => CarrinhoCabecaEntity)
  // @JoinColumn({ name: 'id_carrinhoCabeca' })
  // carrinhoCabeca: CarrinhoCabecaEntity;
}
