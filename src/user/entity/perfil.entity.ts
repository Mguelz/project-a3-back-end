import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LoginEntity } from '../entity/login.entity';

@Entity()
export class PerfilEntity {
  @PrimaryGeneratedColumn()
  id_perfil: number;

  @Column({ length: 100 })
  descricao: string;

  @OneToOne(() => LoginEntity, (login) => login.perfil)
  login: LoginEntity;
}
