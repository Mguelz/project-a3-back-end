import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilEntity } from './entity/perfil.entity';
import { LoginEntity } from './entity/login.entity';
import { PerfilService } from './service/perfil.service';
import { PerfilController } from './controller/perfil.controller';
import { LoginService } from './service/login.service';
import { LoginController } from './controller/login.controller';
import { CatalogoService } from './service/catalogo.service';
import { CatalogoController } from './controller/catalogo.controller';
import { GeneroService } from './service/genero.service';
import { GeneroController } from './controller/genero.controller';
import { CatalogoCabecaEntity } from './entity/catalogo-cabeca.entity';
import { GeneroEntity } from './entity/genero.entity';
import { CarrinhoCabecaEntity } from './entity/carrinho-cabeca.entity';
import { CarrinhoController } from './controller/carrinho.controller';
import { CarrinhoService } from './service/carrinho.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      PerfilEntity,
      LoginEntity,
      CatalogoCabecaEntity,
      GeneroEntity,
      CarrinhoCabecaEntity,
    ]),
  ],
  controllers: [
    AppController,
    PerfilController,
    LoginController,
    CatalogoController,
    GeneroController,
    CarrinhoController,
  ],
  providers: [
    AppService,
    PerfilService,
    LoginService,
    CatalogoService,
    GeneroService,
    CarrinhoService,
  ],
})
export class UserModule {}
