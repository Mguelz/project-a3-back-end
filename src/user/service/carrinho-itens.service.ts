import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarrinhoItensEntity } from '../entity/carrinho-itens.entity';
import { CarrinhoCabecaService } from './carrinho-cabeca.service';
import { CreateCarrinhoItensDto, UpdateCarrinhoItensDto } from '../dto/carrinho-itens.dto';
import { CatalogoService } from './catalogo-cabeca.service';

@Injectable()
export class CarrinhoItensService {
  constructor(
    @InjectRepository(CarrinhoItensEntity)
    private carrinhoItensRepository: Repository<CarrinhoItensEntity>,
    private carrinhoCabecaService: CarrinhoCabecaService,
    private catalogoService: CatalogoService,
  ) {}

  async create(createCarrinhoItensDto: CreateCarrinhoItensDto): Promise<CarrinhoItensEntity> {
    const carrinho = await this.carrinhoCabecaService.findOne(createCarrinhoItensDto.carrinhoIdCarrinho);
    const catalogo = await this.catalogoService.findOne(createCarrinhoItensDto.catalogoIdCatalogo);

    if (!carrinho) {
      throw new NotFoundException(`Carrinho não encontrado.`);
    }

    if (!catalogo) {
      throw new NotFoundException(`Catálogo não encontrado.`);
    }

    const newCarrinhoItens = this.carrinhoItensRepository.create({
      ...createCarrinhoItensDto,
      carrinho: carrinho,
      catalogo: catalogo,
    });
    return await this.carrinhoItensRepository.save(newCarrinhoItens);
  }

  async findAll(): Promise<CarrinhoItensEntity[]> {
    return await this.carrinhoItensRepository.find({ relations: ['carrinho', 'catalogo'] });
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

  async update(id: number, updateCarrinhoItensDto: UpdateCarrinhoItensDto): Promise<CarrinhoItensEntity> {
    const carrinhoItem = await this.findOne(id);

    if (updateCarrinhoItensDto.carrinhoIdCarrinho) {
      const carrinho = await this.carrinhoCabecaService.findOne(updateCarrinhoItensDto.carrinhoIdCarrinho);
      if (!carrinho) {
        throw new NotFoundException(`Carrinho não encontrado.`);
      }
      carrinhoItem.carrinho = carrinho;
    }

    if (updateCarrinhoItensDto.catalogoIdCatalogo) {
      const catalogo = await this.catalogoService.findOne(updateCarrinhoItensDto.catalogoIdCatalogo);
      if (!catalogo) {
        throw new NotFoundException(`Catálogo não encontrado.`);
      }
      carrinhoItem.catalogo = catalogo;
    }

    const updatedCarrinhoItens = this.carrinhoItensRepository.merge(carrinhoItem, updateCarrinhoItensDto);
    return await this.carrinhoItensRepository.save(updatedCarrinhoItens);
  }

  async delete(id: number): Promise<void> {
    const carrinhoItem = await this.findOne(id);
    await this.carrinhoItensRepository.remove(carrinhoItem);
  }
}


// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CarrinhoItensEntity } from '../entity/carrinho-itens.entity';
// import {
//   CreateCarrinhoItensDto,
//   UpdateCarrinhoItensDto,
// } from '../dto/carrinho-itens.dto';

// @Injectable()
// export class CarrinhoItensService {
//   constructor(
//     @InjectRepository(CarrinhoItensEntity)
//     private carrinhoItensRepository: Repository<CarrinhoItensEntity>,
//   ) {}

//   async findAll(): Promise<CarrinhoItensEntity[]> {
//     return await this.carrinhoItensRepository.find({
//       relations: ['carrinhos', 'catalogos'],
//     });
//   }

//   async findOne(id: number): Promise<CarrinhoItensEntity> {
//     const itens = await this.carrinhoItensRepository.findOne({
//       where: { id_carrinho_item: id },
//       relations: ['carrinhos', 'catalogos'],
//     });
//     if (!itens) {
//       throw new HttpException(`Carrinho não encontrado.`, HttpStatus.NOT_FOUND);
//     }
//     return itens;
//   }

//   async create(
//     createCarrinhoItensDto: CreateCarrinhoItensDto,
//   ): Promise<CarrinhoItensEntity> {
//     try {
//       return await this.carrinhoItensRepository.save(
//         this.carrinhoItensRepository.create(createCarrinhoItensDto),
//       );
//     } catch (error) {
//       if (error.code === 'ER_DUP_ENTRY') {
//         throw new HttpException(
//           'Há registros repetidos.',
//           HttpStatus.BAD_REQUEST,
//         );
//       } else {
//         throw new HttpException(
//           'Erro ao criar o carrinho.',
//           HttpStatus.INTERNAL_SERVER_ERROR,
//         );
//       }
//     }
//   }

//   async update(
//     id: number,
//     updateCarrinhoItensDto: UpdateCarrinhoItensDto,
//   ): Promise<void> {
//     const result = await this.carrinhoItensRepository.update(
//       id,
//       updateCarrinhoItensDto,
//     );
//     if (result.affected === 0) {
//       throw new HttpException(`Carrinho não encontrado.`, HttpStatus.NOT_FOUND);
//     }
//   }

//   async delete(id: number): Promise<void> {
//     const result = await this.carrinhoItensRepository.delete(id);
//     if (result.affected === 0) {
//       throw new HttpException(`Carrinho não encontrado.`, HttpStatus.NOT_FOUND);
//     }
//   }
// }
