import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfilEntity } from '../entity/perfil.entity';
import { Repository } from 'typeorm';
import { CreatePerfilDto, UpdatePerfilDto } from '../dto/perfil.dto';
import { LoginEntity } from '../entity/login.entity';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(PerfilEntity)
    private perfilRepository: Repository<PerfilEntity>,
    @InjectRepository(LoginEntity)
    private loginRepository: Repository<LoginEntity>,
  ) {}

  async findAll(): Promise<PerfilEntity[]> {
    return await this.perfilRepository.find({
      relations: ['login', 'carrinhos'],
    });
  }

  async findOne(id: number): Promise<PerfilEntity> {
    const perfil = await this.perfilRepository.findOne({
      where: { id_perfil: id },
      relations: ['login', 'carrinhos'],
    });

    if (!perfil) {
      throw new HttpException(`Usuário não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return perfil;
  }

  async create(createPerfilDto: CreatePerfilDto): Promise<PerfilEntity> {
    const login = await this.loginRepository.findOne({
      where: { id_login: createPerfilDto.loginIdLogin },
    });
    if (!login) {
      throw new NotFoundException(`Login não encontrado.`);
    }

    const novoPerfil = this.perfilRepository.create({
      ...createPerfilDto,
      login: login, // Associando o login encontrado ao novo registro de perfil
    });
    return await this.perfilRepository.save(novoPerfil);
  }

  async update(
    id: number,
    updatePerfilDto: UpdatePerfilDto,
  ): Promise<PerfilEntity> {
    const perfil = await this.findOne(id);

    if (updatePerfilDto.loginIdLogin) {
      const login = await this.loginRepository.findOne({
        where: { id_login: updatePerfilDto.loginIdLogin },
      });

      if (!login) {
        throw new NotFoundException(`Login não encontrado.`);
      }

      perfil.login = login;
    }

    const updatedPerfil = this.perfilRepository.merge(perfil, updatePerfilDto);
    return await this.perfilRepository.save(updatedPerfil);
  }

  async delete(id: number): Promise<void> {
    const perfil = await this.findOne(id);
    await this.perfilRepository.remove(perfil);
  }
}
