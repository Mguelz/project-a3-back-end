import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarrinhoItensEntity } from '../entity/carrinho-itens.entity';
import {
  CreateCarrinhoItensDto,
  UpdateCarrinhoItensDto,
} from '../dto/carrinho-itens.dto';
import { CatalogoService } from './catalogo-cabeca.service';
import { IngressoEntity } from '../entity/ingresso.entity';

@Injectable()
export class CarrinhoItensService {
  constructor(
    @InjectRepository(IngressoEntity)
    private ingressoRepository: Repository<IngressoEntity>,
    private catalogoService: CatalogoService,
    private carrinhoItensRepository: Repository<CarrinhoItensEntity>,
  ) {}

  async create(createCarrinhoItensDto: CreateCarrinhoItensDto): Promise<CarrinhoItensEntity> {
    const catalogo = await this.catalogoService.findOne(createCarrinhoItensDto.catalogoIdCatalogo);

    if (!catalogo) {
      throw new NotFoundException(`Catálogo não encontrado.`);
    }

    // Verifica se o ingresso específico está disponível
    const ingresso = await this.ingressoRepository.findOne({
      where: { 
        catalogo: { id_catalogo: createCarrinhoItensDto.catalogoIdCatalogo }, 
        id_ingresso: createCarrinhoItensDto.ingressoId,
      },
    });

    if (!ingresso) {
      throw new NotFoundException(`Ingresso não encontrado no catálogo.`);
    }

    if (ingresso.quantidade < createCarrinhoItensDto.quantidade) {
      throw new BadRequestException('Não há ingressos disponíveis suficientes!');
    }

    const valorTotalSemDesconto = createCarrinhoItensDto.quantidade * ingresso.preco_unitario;

    if (createCarrinhoItensDto.desconto > valorTotalSemDesconto) {
      throw new BadRequestException('Desconto não pode ser acima do valor total da compra');
    }

    const valorTotalComDesconto = valorTotalSemDesconto - createCarrinhoItensDto.desconto;

    // Atualiza a quantidade disponível do ingresso
    ingresso.quantidade -= createCarrinhoItensDto.quantidade;
    await this.ingressoRepository.save(ingresso);

    const newCarrinhoItens = this.carrinhoItensRepository.create({
      ...createCarrinhoItensDto,
      catalogo,
      ingresso,
      preco_item: ingresso.preco_unitario,
      valor_total: valorTotalComDesconto,
    });

    return await this.carrinhoItensRepository.save(newCarrinhoItens);
  }

  async findAll(): Promise<CarrinhoItensEntity[]> {
    return await this.carrinhoItensRepository.find({
      relations: ['catalogo'],
    });
  }

  async findOne(id: number): Promise<CarrinhoItensEntity> {
    const carrinhoItem = await this.carrinhoItensRepository.findOne({
      where: { id_carrinho_item: id },
      relations: ['catalogo'],
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
