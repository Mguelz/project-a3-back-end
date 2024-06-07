 import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogoCabecaEntity } from '../entity/catalogo-cabeca.entity';
import { CreateCatalogoDto, UpdateCatalogoDto } from '../dto/catalogo.dto';
import { GeneroService } from './genero.service';

@Injectable()
export class CatalogoService {
  constructor(
    @InjectRepository(CatalogoCabecaEntity)
    private catalogoRepository: Repository<CatalogoCabecaEntity>,
    private generoService: GeneroService,
  ) {}

  async create(createCatalogoDto: CreateCatalogoDto): Promise<CatalogoCabecaEntity> {
    const genero = await this.generoService.findOne(createCatalogoDto.generoIdGenero);

    if (!genero) {
      throw new NotFoundException(`Gênero não encontrado.`);
    }

    const newCatalogo = this.catalogoRepository.create({
      ...createCatalogoDto,
      genero: genero,
    });
    return await this.catalogoRepository.save(newCatalogo);
  }

  async findAll(): Promise<CatalogoCabecaEntity[]> {
    return await this.catalogoRepository.find({ relations: ['genero', 'ingressos'] });
  }

  async findOne(id: number): Promise<CatalogoCabecaEntity> {
    const catalogo = await this.catalogoRepository.findOne({
      where: { id_catalogo: id },
      relations: ['genero', 'ingressos'],
    });
    if (!catalogo) {
      throw new NotFoundException(`Catálogo não encontrado.`);
    }
    return catalogo;
  }

  async update(id: number, updateCatalogoDto: UpdateCatalogoDto): Promise<CatalogoCabecaEntity> {
    const catalogo = await this.findOne(id);

    if (updateCatalogoDto.generoIdGenero) {
      const genero = await this.generoService.findOne(updateCatalogoDto.generoIdGenero);
      if (!genero) {
        throw new NotFoundException(`Gênero não encontrado.`);
      }
      catalogo.genero = genero;
    }

    const updatedCatalogo = this.catalogoRepository.merge(catalogo, updateCatalogoDto);
    return await this.catalogoRepository.save(updatedCatalogo);
  }

  async delete(id: number): Promise<void> {
    const catalogo = await this.findOne(id);
    await this.catalogoRepository.remove(catalogo);
  }
}