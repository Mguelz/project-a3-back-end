import {
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    OneToMany,
  } from 'typeorm';
  import { LoginEntity } from '../entity/login.entity';
  import { CarrinhoItensEntity } from '../entity/carrinho-itens.entity';
  
  @Entity()
  export class CarrinhoCabecaEntity {
    @PrimaryGeneratedColumn()
    id_carrinhoCabeca: number;
  
    @OneToOne(() => LoginEntity)
    @JoinColumn()
    id_login: LoginEntity;
  
    @OneToMany(() => CarrinhoItensEntity, (carrinhoIten) => carrinhoIten.carrinhoCabeca)
    itens: CarrinhoItensEntity[];
  }
  