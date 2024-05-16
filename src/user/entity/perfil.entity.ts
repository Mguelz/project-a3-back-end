import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../entity/login.entity";

@Entity()
export class PerfilEntity {
    @OneToOne(() => LoginEntity) @JoinColumn()
    @PrimaryGeneratedColumn()
    id_perfil: string;

    @Column({ length: 100 })
    descricao: string;
}
