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
  @JoinColumn({ name: 'id_perfil' })
  perfil: PerfilEntity;

  @OneToOne(() => CarrinhoCabecaEntity)
  @JoinColumn({ name: 'id_carrinhoCabeca' })
  carrinhoCabeca: CarrinhoCabecaEntity;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 40, nullable: true })
  email?: string;

  @Column({ length: 20 })
  senha: string;

  @Column({ length: 40 })
  nome: string;

  @Column({ type: 'date', nullable: true })
  data_nascimento?: Date;
}
