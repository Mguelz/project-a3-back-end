import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PerfilEntity } from './perfil.entity';
import { LoginEntity } from './login.entity';

// esta classe esta faltando o relacionamento com as outras classes
@Entity()
export class CarrinhoCabecaEntity {
  @PrimaryGeneratedColumn()
  id_carrinho: number;

  @ManyToOne(() => PerfilEntity, (perfil) => perfil.carrinhoCabeca)
  perfil: PerfilEntity;

}
