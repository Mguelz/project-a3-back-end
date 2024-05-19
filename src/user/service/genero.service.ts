import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneroEntity } from '../entity/genero.entity';
import { Repository } from 'typeorm';
import { CreateGeneroDto } from '../dto/genero.dto';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(GeneroEntity)
    private generoRepository: Repository<GeneroEntity>,
  ) {}

  async findAll(): Promise<GeneroEntity[]> {
    return await this.generoRepository.find({ relations: ['catalogos'] });
  }

  async findOne(id: number): Promise<GeneroEntity> {
    const genero = await this.generoRepository.findOne({
      where: { id_genero: id },
      relations: ['catalogos'],
    });

    if (!genero) {
      throw new HttpException(`Gênero não cadastrado.`, HttpStatus.NOT_FOUND);
    }
    return genero;
  }

  async create(createGeneroDto: CreateGeneroDto): Promise<GeneroEntity> {
    try {
      return await this.generoRepository.save(
        this.generoRepository.create(createGeneroDto),
      );
    } catch (error) {
      throw new HttpException(
        'Erro ao tentar criar um gênenro. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateGeneroDto: CreateGeneroDto): Promise<void> {
    const result = await this.generoRepository.update(id, updateGeneroDto);
    if (result.affected === 0) {
      throw new HttpException('Gênero não encontrado.', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.generoRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Gênero não encontrado.', HttpStatus.NOT_FOUND);
    }
  }
}
