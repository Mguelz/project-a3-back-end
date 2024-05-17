import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilEntity } from './entity/perfil.entity';
import { LoginEntity } from './entity/login.entity';
import { PerfilService } from './service/perfil.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([PerfilEntity, LoginEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, PerfilService],
})
export class UserModule {}