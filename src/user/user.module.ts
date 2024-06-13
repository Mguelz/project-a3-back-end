import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilEntity } from './entity/perfil.entity';
import { LoginEntity } from './entity/login.entity';
import { CatalogoEntity } from './entity/catalogo-cabeca.entity';
import { GeneroEntity } from './entity/genero.entity';
import { CarrinhoCabecaEntity } from './entity/carrinho-cabeca.entity';
import { CarrinhoItensEntity } from './entity/carrinho-itens.entity';
import { PerfilService } from './service/perfil.service';
import { LoginService } from './service/login.service';
import { GeneroService } from './service/genero.service';
import { CarrinhoCabecaService } from './service/carrinho-cabeca.service';
import { CarrinhoItensService } from './service/carrinho-itens.service';
import { PerfilController } from './controller/perfil.controller';
import { LoginController } from './controller/login.controller';
import { GeneroController } from './controller/genero.controller';
import { CatalogoController } from './controller/catalogo.controller';
import { CarrinhoCabecaController } from './controller/carrinho-cabeca.controller';
import { CarrinhoItensController } from './controller/carrinho-itens.controller';
import { CatalogoService } from './service/catalogo-cabeca.service';
import { IngressoService } from './service/ingresso.service';
import { IngressoController } from './controller/IngressoController';
import { IngressoEntity } from './entity/ingresso.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      PerfilEntity,
      LoginEntity,
      CatalogoEntity,
      GeneroEntity,
      CarrinhoCabecaEntity,
      CarrinhoItensEntity,
      IngressoEntity,
    ]),
  ],
  controllers: [
    PerfilController,
    LoginController,
    GeneroController,
    CatalogoController,
    CarrinhoCabecaController,
    CarrinhoItensController,
    IngressoController,
  ],
  providers: [
    PerfilService,
    LoginService,
    GeneroService,
    CarrinhoCabecaService,
    CarrinhoItensService,
    CatalogoService,
    IngressoService,
  ],
})
export class UserModule {}
