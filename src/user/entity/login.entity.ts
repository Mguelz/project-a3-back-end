import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PerfilEntity } from '../entity/perfil.entity';

@Entity({name: 'login'})
export class LoginEntity {
  @PrimaryGeneratedColumn()
  id_login?: number;

  @Column({ unique: true, length: 40 })
  email: string;

  @Column({ length: 60 })
  senha: string;

  @OneToOne(() => PerfilEntity, (perfil) => perfil.id_perfil)
  perfil: PerfilEntity[];
}
