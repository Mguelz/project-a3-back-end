import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarrinhoItensEntity } from '../entity/carrinho-itens.entity';
import { CarrinhoCabecaService } from './carrinho-cabeca.service';
import {
  CreateCarrinhoItensDto,
  UpdateCarrinhoItensDto,
} from '../dto/carrinho-itens.dto';
import { CatalogoService } from './catalogo-cabeca.service';

@Injectable()
export class CarrinhoItensService {
  constructor(
    @InjectRepository(CarrinhoItensEntity)
    private carrinhoItensRepository: Repository<CarrinhoItensEntity>,
    // private carrinhoCabecaService: CarrinhoCabecaService,
    private catalogoService: CatalogoService,
  ) {}

  async create(
    createCarrinhoItensDto: CreateCarrinhoItensDto,
  ): Promise<CarrinhoItensEntity> {
    const catalogo = await this.catalogoService.findOne(
      createCarrinhoItensDto.catalogoIdCatalogo,
    );

    if (!catalogo) {
      throw new NotFoundException(`Catálogo não encontrado.`);
    }

    const newCarrinhoItens = this.carrinhoItensRepository.create({
      ...createCarrinhoItensDto,
      catalogo: catalogo,
    });
    return await this.carrinhoItensRepository.save(newCarrinhoItens);
  }

  async findAll(): Promise<CarrinhoItensEntity[]> {
    return await this.carrinhoItensRepository.find({
      relations: ['carrinho', 'catalogo'],
    });
  }

  async findOne(id: number): Promise<CarrinhoItensEntity> {
    const carrinhoItem = await this.carrinhoItensRepository.findOne({
      where: { id_carrinho_item: id },
      relations: ['carrinho', 'catalogo'],
    });
    if (!carrinhoItem) {
      throw new NotFoundException(`Item do carrinho não encontrado.`);
    }
    return carrinhoItem;
  }

  async update(
    id: number,
    updateCarrinhoItensDto: UpdateCarrinhoItensDto,
  ): Promise<CarrinhoItensEntity> {
    const carrinhoItem = await this.findOne(id);

    if (updateCarrinhoItensDto.catalogoIdCatalogo) {
      const catalogo = await this.catalogoService.findOne(
        updateCarrinhoItensDto.catalogoIdCatalogo,
      );
      if (!catalogo) {
        throw new NotFoundException(`Catálogo não encontrado.`);
      }
      carrinhoItem.catalogo = catalogo;
    }

    const updatedCarrinhoItens = this.carrinhoItensRepository.merge(
      carrinhoItem,
      updateCarrinhoItensDto,
    );
    return await this.carrinhoItensRepository.save(updatedCarrinhoItens);
  }

  async delete(id: number): Promise<void> {
    const carrinhoItem = await this.findOne(id);
    await this.carrinhoItensRepository.remove(carrinhoItem);
  }
}
