import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GeneroEntity } from "../entity/genero.entity";

@Entity()
export class CatalogoItensEntity {
    @PrimaryGeneratedColumn()
    id_catalogo: number

    @OneToOne(() => GeneroEntity) @JoinColumn()
    id_genero: string;


    @Column({length: 40})
    descricao: string;

    @Column({length: 100})
    iamgem: string;
}
