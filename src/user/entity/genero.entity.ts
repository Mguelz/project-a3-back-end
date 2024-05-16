import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CatalogoCabecaEntity } from "../entity/catalogo-cabeca.entity";

@Entity()
export class GeneroEntity {
    @OneToOne(() => CatalogoCabecaEntity) @JoinColumn()
    @PrimaryGeneratedColumn()
    id_genero: number

    @Column({ length: 100 })
    descricao: string;
}
