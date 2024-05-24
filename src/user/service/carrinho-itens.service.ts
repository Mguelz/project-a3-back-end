import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarrinhoItensEntity } from '../entity/carrinho-itens.entity';
import {
  CreateCarrinhoItensDto,
  UpdateCarrinhoItensDto,
} from '../dto/carrinho-itens.dto';

@Injectable()
export class CarrinhoItensService {
  constructor(
    @InjectRepository(CarrinhoItensEntity)
    private carrinhoItensRepository: Repository<CarrinhoItensEntity>,
  ) {}

  async findAll(): Promise<CarrinhoItensEntity[]> {
    return await this.carrinhoItensRepository.find({
      relations: ['carrinhos', 'catalogos'],
    });
  }

  async findOne(id: number): Promise<CarrinhoItensEntity> {
    const itens = await this.carrinhoItensRepository.findOne({
      where: { id_carrinho_item: id },
      relations: ['carrinhos', 'catalogos'],
    });
    if (!itens) {
      throw new HttpException(`Carrinho não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return itens;
  }

  async create(
    createCarrinhoItensDto: CreateCarrinhoItensDto,
  ): Promise<CarrinhoItensEntity> {
    try {
      return await this.carrinhoItensRepository.save(
        this.carrinhoItensRepository.create(createCarrinhoItensDto),
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'Há registros repetidos.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Erro ao criar o carrinho.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async update(
    id: number,
    updateCarrinhoItensDto: UpdateCarrinhoItensDto,
  ): Promise<void> {
    const result = await this.carrinhoItensRepository.update(
      id,
      updateCarrinhoItensDto,
    );
    if (result.affected === 0) {
      throw new HttpException(`Carrinho não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.carrinhoItensRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Carrinho não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }
}
