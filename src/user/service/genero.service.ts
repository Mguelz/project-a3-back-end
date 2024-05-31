import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneroEntity } from '../entity/genero.entity';
import { Repository } from 'typeorm';
import { CreateGeneroDto, UpdateGeneroDto } from '../dto/genero.dto';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(GeneroEntity)
    private generoRepository: Repository<GeneroEntity>,
  ) {}

  async findAll(): Promise<GeneroEntity[]> {
    return await this.generoRepository.find();
  }

  async findOne(id: number): Promise<GeneroEntity> {
    const genero = await this.generoRepository.findOne({
      where: { id_genero: id },
      relations: ['catalogos'],
    });
    if (!genero) {
      throw new NotFoundException(`Gênero não encontrado.`);
    }
    return genero;
  }

  async create(createGeneroDto: CreateGeneroDto): Promise<GeneroEntity> {
    const newGenero = this.generoRepository.create(createGeneroDto);
    return await this.generoRepository.save(newGenero);
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto): Promise<void> {
    const result = await this.generoRepository.update(id, updateGeneroDto);
    if (result.affected === 0) {
      throw new HttpException(`Gênero não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<void> {
    const genero = await this.findOne(id);
    await this.generoRepository.remove(genero);
  }
}
