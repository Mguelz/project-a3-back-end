import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogoCabecaEntity } from '../entity/catalogo-cabeca.entity';
import { Repository } from 'typeorm';
import { CreateCatalogoDto } from '../dto/catalogo-cabeca.dto';
import { GeneroEntity } from '../entity/genero.entity';

export class CatalogoService {
  constructor(
    @InjectRepository(CatalogoCabecaEntity)
    private readonly catalogoRepository: Repository<CatalogoCabecaEntity>,

    @InjectRepository(GeneroEntity)
    private readonly generoRepository: Repository<GeneroEntity>,
  ) {}

  async findAll(): Promise<CatalogoCabecaEntity[]> {
    return await this.catalogoRepository.find({ relations: ['genero'] });
  }

  async findOne(id: number): Promise<CatalogoCabecaEntity> {
    const catalogo = await this.catalogoRepository.findOne({
      where: { id_catalogo: id },
      relations: ['genero'],
    });

    if (!catalogo) {
      throw new HttpException(`Catálogo não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return catalogo;
  }

  async create(
    createCatalogoDto: CreateCatalogoDto,
  ): Promise<CatalogoCabecaEntity> {
    try {
      const { generos, ...catalogoData } = createCatalogoDto;

      const generoEntities = await Promise.all(
        generos.map(async (genero) => {
          let existingGenero = await this.generoRepository.findOne({
            where: { id_genero: genero.id_genero },
          });
          if (!existingGenero) {
            existingGenero = this.generoRepository.create(genero);
            await this.generoRepository.save(existingGenero);
          }
          return existingGenero;
        }),
      );

      const catalogo = this.catalogoRepository.create({
        ...catalogoData,
        generos: generoEntities,
      });

      return await this.catalogoRepository.save(catalogo);
    } catch (error) {
      throw new HttpException(
        'Erro ao criar o registro. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateCatalogoDto: CreateCatalogoDto,
  ): Promise<void> {
    const result = await this.catalogoRepository.update(id, updateCatalogoDto);
    if (result.affected === 0) {
      throw new HttpException(`Catálogo não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.catalogoRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Catálogo não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }
}
