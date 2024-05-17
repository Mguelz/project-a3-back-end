import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PerfilEntity } from '../entity/perfil.entity';
import { CarrinhoCabecaEntity } from '../entity/carrinho-cabeca.entity';

@Entity()
export class LoginEntity {
  @PrimaryGeneratedColumn()
  id_login: number;

  @OneToOne(() => PerfilEntity)
  @JoinColumn()
  id_perfil: number;

  @OneToOne(() => CarrinhoCabecaEntity)
  @JoinColumn()
  id_carrinhoCabeca: number;

  @Column({ unique: true, length: 14 })
  cpf: string;

  @Column({ unique: true, length: 40 })
  email: string;

  @Column({ length: 60 })
  senha: string;

  @Column({ length: 40 })
  nome: string;

  @Column({ type: 'date' })
  data_nascimento: Date;
}
