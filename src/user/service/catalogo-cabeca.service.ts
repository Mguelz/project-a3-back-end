import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogoCabecaEntity } from '../entity/catalogo-cabeca.entity';
import { Repository } from 'typeorm';
import { CreateCatalogoDto, UpdateCatalogoDto } from '../dto/catalogo.dto';

// ESSA CLASSE ESTA SENDO CRIADA AUTOMATICAMENTE
// POPULEI ELA PARA CASO ALGO ESPECIFICO DO CÓDIGO ESTEJA USANDO ELA AO INVES DA "Catalogo-cabeca.service"

@Injectable()
export class CatalogoCabecaService {
  constructor(
    @InjectRepository(CatalogoCabecaEntity)
    private catalogoRepository: Repository<CatalogoCabecaEntity>,
  ) {}

  async findAll(): Promise<CatalogoCabecaEntity[]> {
    return await this.catalogoRepository.find({
      relations: ['catalogos', 'generos'],
    });
  }

  async findOne(id: number): Promise<CatalogoCabecaEntity> {
    const catalogo = await this.catalogoRepository.findOne({
      where: { id_catalogo: id },
      relations: ['catalogos', 'generos'],
    });
    if (!catalogo) {
      throw new HttpException(`Catalogo não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return catalogo;
  }

  async create(
    createCatalogoDto: CreateCatalogoDto,
  ): Promise<CatalogoCabecaEntity> {
    try {
      return await this.catalogoRepository.save(
        this.catalogoRepository.create(createCatalogoDto),
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

  async update(
    id: number,
    updateCatalogoDto: UpdateCatalogoDto,
  ): Promise<void> {
    const result = await this.catalogoRepository.update(id, updateCatalogoDto);
    if (result.affected === 0) {
      throw new HttpException(`Catalogo não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.catalogoRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Catalogo não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }
}
