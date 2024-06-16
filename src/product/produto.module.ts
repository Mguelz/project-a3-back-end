import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoEntity } from './entity/catalogo-cabeca.entity';
import { GeneroEntity } from './entity/genero.entity';
import { GeneroService } from './service/genero.service';
import { GeneroController } from './controller/genero.controller';
import { CatalogoController } from './controller/catalogo.controller';
import { CatalogoService } from './service/catalogo-cabeca.service';
import { IngressoService } from './service/ingresso.service';
import { IngressoController } from './controller/IngressoController';
import { IngressoEntity } from './entity/ingresso.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([CatalogoEntity, GeneroEntity, IngressoEntity]),
  ],
  controllers: [GeneroController, CatalogoController, IngressoController],
  providers: [GeneroService, CatalogoService, IngressoService],
})
export class ProductModule {}
