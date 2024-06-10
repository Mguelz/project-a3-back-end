import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CatalogoCabecaEntity } from './catalogo-cabeca.entity';

@Entity({ name: 'ingresso' })
export class IngressoEntity {
  @PrimaryGeneratedColumn()
  id_ingresso: number;

  @Column({ length: 50 })
  nome: string;

  @Column({ type: 'int' })
  quantidade: number;

  @Column({ type: 'numeric', precision: 7, scale: 2 })
  preco_unitario: number;

  @ManyToOne(() => CatalogoCabecaEntity, (catalogo) => catalogo.ingressos)
  catalogo: CatalogoCabecaEntity; // [] - não precisa / ingresso pertence a 1 catalogo
}
