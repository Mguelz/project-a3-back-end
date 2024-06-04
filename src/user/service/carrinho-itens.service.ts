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

@Injectable()
export class CarrinhoItensService {
  constructor(
    @InjectRepository(CarrinhoItensEntity)
    private carrinhoItensRepository: Repository<CarrinhoItensEntity>,
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

    // verifica se a quantidade que deseja comprar realmente esta disponivel
    if (catalogo.disponivel < createCarrinhoItensDto.quantidade) {
      throw new BadRequestException('Não há ingressos disponiveis!');
    }

    //calcula o valor total do carrinho
    const valorTotalSemDesconto =
      createCarrinhoItensDto.quantidade * catalogo.preco_unitario;
    if (createCarrinhoItensDto.desconto > valorTotalSemDesconto) {
      throw new BadRequestException('Desconto não pode ser acima do valor total da compra');
    }
    const valorTotalComDesconto = valorTotalSemDesconto - createCarrinhoItensDto.desconto;

    // atualiza na tabela catalogo a quantidade disponivel
    catalogo.disponivel -= createCarrinhoItensDto.quantidade;
    await this.catalogoService.update(catalogo.id_catalogo, catalogo);

    const newCarrinhoItens = this.carrinhoItensRepository.create({
      ...createCarrinhoItensDto,
      catalogo: catalogo,
      valor_total: valorTotalComDesconto, // passa o valor total
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
