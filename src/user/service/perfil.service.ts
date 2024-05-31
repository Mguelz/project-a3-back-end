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
      relations: ['login', 'carinhos'],
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

    const newPerfil = this.perfilRepository.create({
      ...createPerfilDto,
      login: login, // Associando o login encontrado ao novo registro de perfil
    });
    return await this.perfilRepository.save(newPerfil);
  }

  async update(id: number, updatePerfilDto: UpdatePerfilDto): Promise<void> {
    const result = await this.perfilRepository.update(id, updatePerfilDto);
    if (result.affected === 0) {
      throw new HttpException(`Usuário não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.perfilRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Usuário não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }
}
