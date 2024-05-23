import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilEntity } from './entity/perfil.entity';
import { LoginEntity } from './entity/login.entity';
import { CatalogoCabecaEntity } from './entity/catalogo-cabeca.entity';
import { GeneroEntity } from './entity/genero.entity';
import { CarrinhoCabecaEntity } from './entity/carrinho-cabeca.entity';
import { CarrinhoItensEntity } from './entity/carrinho-itens.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      PerfilEntity,
      LoginEntity,
      CatalogoCabecaEntity,
      GeneroEntity,
      CarrinhoCabecaEntity,
      CarrinhoItensEntity,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class UserModule {}
