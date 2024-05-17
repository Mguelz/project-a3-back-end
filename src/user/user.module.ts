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

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([PerfilEntity, LoginEntity]),
  ],
  controllers: [AppController, PerfilController, LoginController],
  providers: [AppService, PerfilService, LoginService],
})
export class UserModule {}
