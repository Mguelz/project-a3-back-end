import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarrinhoService {
  //   constructor(
  //     @InjectRepository(CarrinhoEntity)
  //     private readonly carrinhoRepository: Repository<CarrinhoEntity>,
  //   ) {}
  //   async findAll(): Promise<CarrinhoEntity[]> {
  //     return await this.carrinhoRepository.find();
  //   }
  //   async findOne(id: number): Promise<CarrinhoEntity> {
  //     const carrinho = await this.carrinhoRepository.findOne(id);
  //     if (!carrinho) {
  //       throw new HttpException('Carrinho não encontrado.', HttpStatus.NOT_FOUND);
  //     }
  //     return carrinho;
  //   }
  //   async create(createCarrinhoDto: CreateCarrinhoDto): Promise<CarrinhoEntity> {
  //     try {
  //       const carrinho = this.carrinhoRepository.create(createCarrinhoDto);
  //       return await this.carrinhoRepository.save(carrinho);
  //     } catch (error) {
  //       throw new HttpException(
  //         'Erro ao criar o registro. Tente novamente mais tarde.',
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }
  //   async update(
  //     id: number,
  //     updateCarrinhoDto: UpdateCarrinhoDto,
  //   ): Promise<void> {
  //     const result = await this.carrinhoRepository.update(id, updateCarrinhoDto);
  //     if (result.affected === 0) {
  //       throw new HttpException('Carrinho não encontrado.', HttpStatus.NOT_FOUND);
  //     }
  //   }
  //   async delete(id: number): Promise<void> {
  //     const result = await this.carrinhoRepository.delete(id);
  //     if (result.affected === 0) {
  //       throw new HttpException(`Carrinho não encontrado.`, HttpStatus.NOT_FOUND);
  //     }
  //   }
}
