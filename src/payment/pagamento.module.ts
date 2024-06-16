import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrinhoCabecaEntity } from './entity/carrinho-cabeca.entity';
import { CarrinhoItensEntity } from './entity/carrinho-itens.entity';
import { CarrinhoCabecaService } from './service/carrinho-cabeca.service';
import { CarrinhoItensService } from './service/carrinho-itens.service';
import { CarrinhoCabecaController } from './controller/carrinho-cabeca.controller';
import { CarrinhoItensController } from './controller/carrinho-itens.controller';
import { CatalogoEntity } from 'src/product/entity/catalogo-cabeca.entity';
import { IngressoEntity } from 'src/product/entity/ingresso.entity';
import { PerfilService } from 'src/user/service/perfil.service';
import { PerfilEntity } from 'src/user/entity/perfil.entity';
import { LoginEntity } from 'src/user/entity/login.entity';
import { CatalogoService } from 'src/product/service/catalogo-cabeca.service';
import { GeneroService } from 'src/product/service/genero.service';
import { GeneroEntity } from 'src/product/entity/genero.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      CarrinhoCabecaEntity,
      CarrinhoItensEntity,
      CatalogoEntity,
      IngressoEntity,
      PerfilEntity,
      LoginEntity,
      GeneroEntity,
    ]),
  ],
  controllers: [CarrinhoCabecaController, CarrinhoItensController],
  providers: [
    CarrinhoCabecaService,
    CarrinhoItensService,
    PerfilService,
    CatalogoService,
    GeneroService,
  ],
})
export class PaymentModule {}
