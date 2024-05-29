import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfilEntity } from '../entity/perfil.entity';
import { Repository } from 'typeorm';
import { CreatePerfilDto, UpdatePerfilDto } from '../dto/perfil.dto';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(PerfilEntity)
    private perfilRepository: Repository<PerfilEntity>,
  ) {}

  async findAll(): Promise<PerfilEntity[]> {
    return await this.perfilRepository.find({
      // relations: ['login', 'carrinhos'],
    });
  }

  async findOne(id: number): Promise<PerfilEntity> {
    const perfil = await this.perfilRepository.findOne({
      where: { id_perfil: id },
      // relations: ['login', 'carinhos'],
    });

    if (!perfil) {
      throw new HttpException(`Usuário não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return perfil;
  }

  async create(createPerfilDto: CreatePerfilDto): Promise<PerfilEntity> {
    try {
      return await this.perfilRepository.save(
        this.perfilRepository.create(createPerfilDto),
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'Há registros repetidos.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Erro ao criar o registro. Tente novamente mais tarde.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
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
