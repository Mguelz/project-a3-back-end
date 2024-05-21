import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PerfilEntity } from './perfil.entity';

@Entity()
export class CarrinhoEntity {
  @PrimaryGeneratedColumn()
  id_carrinhoCabeca: number;

  @OneToOne(() => PerfilEntity, (perfil) => perfil.carrinhoCabeca)
  @JoinColumn()
  login: PerfilEntity;
}
