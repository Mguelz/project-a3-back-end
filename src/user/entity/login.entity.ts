import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PerfilEntity } from '../entity/perfil.entity';
import { CarrinhoCabecaEntity } from '../entity/carrinho-cabeca.entity';
import { IsOptional } from 'class-validator';

@Entity()
export class LoginEntity {
  @PrimaryGeneratedColumn()
  id_login: number;

  @OneToOne(() => PerfilEntity, (perfil) => perfil.login)
  @JoinColumn()
  perfil: PerfilEntity;

  @IsOptional()
  @OneToOne(
    () => CarrinhoCabecaEntity,
    (carrinhoCabeca) => carrinhoCabeca.login,
  )
  @JoinColumn()
  carrinhoCabeca: CarrinhoCabecaEntity;

  @Column({ unique: true, length: 14 })
  cpf: string;

  @IsOptional()
  @Column({ unique: true, length: 40 })
  email: string;

  @Column({ length: 60 })
  senha: string;

  @Column({ length: 40 })
  nome: string;

  @Column({ type: 'date' })
  data_nascimento: Date;
}
