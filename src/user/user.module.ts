import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilEntity } from './entity/perfil.entity';
import { LoginEntity } from './entity/login.entity';
import { PerfilService } from './service/perfil.service';
import { LoginService } from './service/login.service';
import { PerfilController } from './controller/perfil.controller';
import { LoginController } from './controller/login.controller';
import { CarrinhoCabecaEntity } from 'src/payment/entity/carrinho-cabeca.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([PerfilEntity, LoginEntity, CarrinhoCabecaEntity]),
  ],
  controllers: [PerfilController, LoginController],
  providers: [PerfilService, LoginService],
})
export class UserModule {}
