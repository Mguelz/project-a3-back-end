import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerfilEntity } from '../entity/perfil.entity';
import { CreatePerfilDto, UpdatePerfilDto } from '../dto/perfil.dto';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(PerfilEntity)
    private readonly perfilRepository: Repository<PerfilEntity>,
  ) {}

  async findAll(): Promise<PerfilEntity[]> {
    return await this.perfilRepository.find();
  }

  async findOne(id: number): Promise<PerfilEntity> {
    const perfil = await this.perfilRepository.findOne(id);
    if (!perfil) {
      throw new HttpException('Perfil não encontrado.', HttpStatus.NOT_FOUND);
    }
    return perfil;
  }

  async create(createPerfilDto: CreatePerfilDto): Promise<PerfilEntity> {
    try {
      const perfil = this.perfilRepository.create(createPerfilDto);
      return await this.perfilRepository.save(perfil);
    } catch (error) {
      throw new HttpException(
        'Erro ao criar o registro. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updatePerfilDto: UpdatePerfilDto): Promise<void> {
    const result = await this.perfilRepository.update(id, updatePerfilDto);
    if (result.affected === 0) {
      throw new HttpException('Perfil não encontrado.', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.perfilRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Perfil não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }
}
