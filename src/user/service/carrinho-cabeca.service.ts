import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarrinhoCabecaEntity } from '../entity/carrinho-cabeca.entity';
import { PerfilService } from './perfil.service';
import {
  CreateCarrinhoCabecaDto,
  UpdateCarrinhoCabecaDto,
} from '../dto/carrinho-cabeca.dto';
import { CarrinhoItensService } from './carrinho-itens.service';

@Injectable()
export class CarrinhoCabecaService {
  constructor(
    @InjectRepository(CarrinhoCabecaEntity)
    private carrinhoCabecaRepository: Repository<CarrinhoCabecaEntity>,
    private perfilService: PerfilService,
    private itensService: CarrinhoItensService,
  ) {}

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

  async create(
    // perfil
    createCarrinhoCabecaDto: CreateCarrinhoCabecaDto,
  ): Promise<CarrinhoCabecaEntity> {
    const perfil = await this.perfilService.findOne(
      createCarrinhoCabecaDto.perfilIdPerfil,
    );

    if (!perfil) {
      throw new NotFoundException(`Perfil não encontrado.`);
    }
    
    const novoCarrinhoCabeca = this.carrinhoCabecaRepository.create({
      ...createCarrinhoCabecaDto,
      perfil: perfil,
      // itens: itens,
    });

    return await this.carrinhoCabecaRepository.save(novoCarrinhoCabeca);
  }

  async update(
    id: number,
    updateCarrinhoCabecaDto: UpdateCarrinhoCabecaDto,
  ): Promise<CarrinhoCabecaEntity> {
    const carrinhoCabeca = await this.findOne(id);

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