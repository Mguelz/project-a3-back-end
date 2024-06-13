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
    @InjectRepository(CarrinhoItensEntity)
    private carrinhoItensRepository: Repository<CarrinhoItensEntity>,
    private catalogoService: CatalogoService,
    @InjectRepository(IngressoEntity)
    private ingressoRepository: Repository<IngressoEntity>,
  ) {}

  async create(
    createCarrinhoItensDto: CreateCarrinhoItensDto,
  ): Promise<CarrinhoItensEntity> {
    // Buscar o catálogo pelo ID fornecido
    const catalogo = await this.catalogoService.findOne(
      createCarrinhoItensDto.catalogoIdCatalogo,
    );

    if (!catalogo) {
      throw new NotFoundException(`Catálogo não encontrado.`);
    }

    // Buscar o ingresso pelo ID fornecido
    const ingresso = await this.ingressoRepository.findOne({
      where: { id_ingresso: createCarrinhoItensDto.ingressoId },
    });

    if (!ingresso) {
      throw new NotFoundException(`Ingresso não encontrado.`);
    }

    // Verifica se a quantidade desejada está disponível
    if (ingresso.quantidade < createCarrinhoItensDto.quantidade) {
      throw new BadRequestException('Quantidade de ingressos indisponível.');
    }

    // Calcula o valor total com e sem desconto
    const valorTotalSemDesconto =
      createCarrinhoItensDto.quantidade * ingresso.preco_unitario;
    if (createCarrinhoItensDto.desconto > valorTotalSemDesconto) {
      throw new BadRequestException(
        'Desconto não pode ser maior que o valor total.',
      );
    }
    const valorTotalComDesconto =
      valorTotalSemDesconto - createCarrinhoItensDto.desconto;

    // Atualiza a quantidade disponível do ingresso
    ingresso.quantidade -= createCarrinhoItensDto.quantidade;
    await this.ingressoRepository.save(ingresso);

    // Cria o novo item do carrinho
    const newCarrinhoItens = this.carrinhoItensRepository.create({
      ...createCarrinhoItensDto,
      catalogo: catalogo,
      ingresso: ingresso,
      // preco_item: ingresso.preco_unitario,
      valor_total: valorTotalComDesconto,
    });

    // Salva o novo item do carrinho no banco de dados
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
