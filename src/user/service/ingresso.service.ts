import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IngressoEntity } from '../entity/ingresso.entity';
import { Repository } from 'typeorm';
import { CreateIngressoDto, UpdateIngressoDto } from '../dto/ingresso.dto';
import { CatalogoService } from './catalogo-cabeca.service';

@Injectable()
export class IngressoService {
  constructor(
    @InjectRepository(IngressoEntity)
    private ingressoRepository: Repository<IngressoEntity>,
    private catalogoService: CatalogoService,
  ) {}

  async create(createIngressoDto: CreateIngressoDto): Promise<IngressoEntity> {
    const catalogo = await this.catalogoService.findOne(
      createIngressoDto.catalogoIdCatalogo,
    );

    if (!catalogo) {
      throw new NotFoundException(`Catalogo não encontrado.`);
    }

    const newIngresso = this.ingressoRepository.create({
      ...createIngressoDto,
      catalogo: catalogo,
    });
    return await this.ingressoRepository.save(newIngresso);
  }

  async findAll(): Promise<IngressoEntity[]> {
    return await this.ingressoRepository.find({
      relations: ['catalogo'],
    });
  }

  async findOne(id: number): Promise<IngressoEntity> {
    const ingressos = await this.ingressoRepository.findOne({
      where: { id_ingresso: id },
      relations: ['catalogo'],
    });
    if (!ingressos) {
      throw new NotFoundException(`Ingresso não cadastrado.`);
    }
    return ingressos;
  }

//   async update(
//     id: number,
//     updateIngressoDto: UpdateIngressoDto,
//   ): Promise<IngressoEntity> {
//     const ingresso = await this.findOne(id);

//     if (updateIngressoDto.catalogoIdCatalogo) {
//       const catalogo = await this.catalogoService.findOne(
//         updateIngressoDto.catalogoIdCatalogo,
//       );
//       if (!catalogo) {
//         throw new NotFoundException(`Catálogo não encontrado.`);
//       }
//       ingresso.catalogoIdCatalogo = catalogo;
//     }

//     const updateIngresso = this.ingressoRepository.merge(
//       ingresso,
//       updateIngressoDto,
//     );
//     return await this.ingressoRepository.save(updateIngresso);
//   }

  async delete(id: number): Promise<void> {
    const ingresso = await this.findOne(id);
    await this.ingressoRepository.remove(ingresso);
  }
}
