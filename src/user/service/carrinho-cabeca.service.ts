import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarrinhoCabecaEntity } from '../entity/carrinho-cabeca.entity';
import { PerfilService } from './perfil.service';
import {
  CreateCarrinhoCabecaDto,
  UpdateCarrinhoCabecaDto,
} from '../dto/carrinho-cabeca.dto';

@Injectable()
export class CarrinhoCabecaService {
  constructor(
    @InjectRepository(CarrinhoCabecaEntity)
    private carrinhoCabecaRepository: Repository<CarrinhoCabecaEntity>,
    private perfilService: PerfilService,
  ) {}

  async create(
    createCarrinhoCabecaDto: CreateCarrinhoCabecaDto,
  ): Promise<CarrinhoCabecaEntity> {
    const perfil = await this.perfilService.findOne(
      createCarrinhoCabecaDto.perfilIdPerfil,
    );

    if (!perfil) {
      throw new NotFoundException(`Perfil não encontrado.`);
    }

    const newCarrinhoCabeca = this.carrinhoCabecaRepository.create({
      ...createCarrinhoCabecaDto,
      perfil: perfil,
    });
    return await this.carrinhoCabecaRepository.save(newCarrinhoCabeca);
  }

  async findAll(): Promise<CarrinhoCabecaEntity[]> {
    return await this.carrinhoCabecaRepository.find({
      relations: ['perfil', 'itens'],
    });
  }

  async findOne(id: number): Promise<CarrinhoCabecaEntity> {
    const carrinhoCabeca = await this.carrinhoCabecaRepository.findOne({
      where: { id_carrinho: id },
      relations: ['perfil', 'itens'],
    });
    if (!carrinhoCabeca) {
      throw new NotFoundException(`Carrinho não encontrado.`);
    }
    return carrinhoCabeca;
  }

  async update(id: number, updateCarrinhoCabecaDto: UpdateCarrinhoCabecaDto): Promise<CarrinhoCabecaEntity> {
    const carrinhoCabeca = await this.findOne(id);

    // Explicitly ensure the DTO is a DeepPartial<CarrinhoCabecaEntity>
    const updatedCarrinhoCabeca = this.carrinhoCabecaRepository.create({
      ...carrinhoCabeca,
      ...updateCarrinhoCabecaDto,
    });

    return this.carrinhoCabecaRepository.save(updatedCarrinhoCabeca);
  }

  async delete(id: number): Promise<void> {
    const carrinhoCabeca = await this.findOne(id);
    await this.carrinhoCabecaRepository.remove(carrinhoCabeca);
  }
}

// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CarrinhoCabecaEntity } from '../entity/carrinho-cabeca.entity';
// import {
//   CreateCarrinhoCabecaDto,
//   UpdateCarrinhoCabecaDto,
// } from '../dto/carrinho-cabeca.dto';

// @Injectable()
// export class CarrinhoCabecaService {
//   constructor(
//     @InjectRepository(CarrinhoCabecaEntity)
//     private carrinhoCabecaRepository: Repository<CarrinhoCabecaEntity>,
//   ) {}

//   async findAll(): Promise<CarrinhoCabecaEntity[]> {
//     return await this.carrinhoCabecaRepository.find({
//       relations: ['perfil', 'itens'],
//     });
//   }

//   async findOne(id: number): Promise<CarrinhoCabecaEntity> {
//     const carrinho = await this.carrinhoCabecaRepository.findOne({
//       where: { id_carrinho: id },
//       relations: ['perfil', 'itens'],
//     });
//     if (!carrinho) {
//       throw new HttpException(`Carrinho não encontrado.`, HttpStatus.NOT_FOUND);
//     }
//     return carrinho;
//   }

//   async create(
//     createCarrinhoCabecaDto: CreateCarrinhoCabecaDto,
//   ): Promise<CarrinhoCabecaEntity> {
//     try {
//       return await this.carrinhoCabecaRepository.save(
//         this.carrinhoCabecaRepository.create(createCarrinhoCabecaDto),
//       );
//     } catch (error) {
//       if (error.code === 'ER_DUP_ENTRY') {
//         throw new HttpException(
//           'Há registros repetidos.',
//           HttpStatus.BAD_REQUEST,
//         );
//       } else {
//         throw new HttpException(
//           'Erro ao criar o carrinho. Tente novamente mais tarde.',
//           HttpStatus.INTERNAL_SERVER_ERROR,
//         );
//       }
//     }
//   }

//   async update(
//     id: number,
//     updateCarrinhoCabecaDto: UpdateCarrinhoCabecaDto,
//   ): Promise<void> {
//     const result = await this.carrinhoCabecaRepository.update(
//       id,
//       updateCarrinhoCabecaDto,
//     );
//     if (result.affected === 0) {
//       throw new HttpException(`Carrinho não encontrado.`, HttpStatus.NOT_FOUND);
//     }
//   }

//   async delete(id: number): Promise<void> {
//     const result = await this.carrinhoCabecaRepository.delete(id);
//     if (result.affected === 0) {
//       throw new HttpException(`Carrinho não encontrado.`, HttpStatus.NOT_FOUND);
//     }
//   }
// }
