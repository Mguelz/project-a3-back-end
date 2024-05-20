import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LoginEntity } from '../entity/login.entity';

@Entity()
export class CarrinhoCabecaEntity {
  @PrimaryGeneratedColumn()
  id_carrinhoCabeca: number;

  @OneToOne(() => LoginEntity, (login) => login.carrinhoCabeca)
  login: LoginEntity;
}
