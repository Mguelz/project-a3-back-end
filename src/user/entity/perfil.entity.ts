import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToOne(() => LoginEntity)
  @JoinColumn()
  login: LoginEntity;
    // antigo
//   @OneToOne(() => LoginEntity)
//   @JoinColumn()
//   @PrimaryGeneratedColumn()
//   id_perfil: number;

//   @Column({ length: 100 })
//   descricao: string;
}
