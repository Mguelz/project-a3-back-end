import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CarrinhoCabecaEntity } from "./carrinho-cabeca.entity";
import { CatalogoCabecaEntity } from "./catalogo-cabeca.entity";

@Entity()
export class CarrinhoItensEntity {
    @PrimaryGeneratedColumn()
  id_carrinho_item: number;

  @ManyToOne(() => CarrinhoCabecaEntity, (carrinho) => carrinho.itens)
  carrinho: CarrinhoCabecaEntity;
  // carrinho: CarrinhoCabecaEntity[];

  @ManyToMany(() => CatalogoCabecaEntity, (catalogo) => catalogo.carrinhoItens)
  catalogos: CatalogoCabecaEntity;
  // catalogos: CatalogoCabecaEntity[];

  @Column({ type: 'numeric', precision: 7, scale: 2 })
  desconto: number;

  @Column({ type: 'numeric', precision: 7, scale: 2 })
  preco_item: number;

  @Column({ type: 'int' })
  quantidade: number;
}
