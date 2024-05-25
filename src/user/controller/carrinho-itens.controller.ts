import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CarrinhoItensService } from '../service/carrinho-itens.service';
import {
  CreateCarrinhoItensDto,
  UpdateCarrinhoItensDto,
} from '../dto/carrinho-itens.dto';
@Controller('carrinho-itens')
export class CarrinhoItensController {
  constructor(private readonly carrinhoItensService: CarrinhoItensService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.carrinhoItensService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.carrinhoItensService.findOne(id);
  }

  @Post()
  async create(
    @Body() createCarrinhoItensDto: CreateCarrinhoItensDto,
  ): Promise<any> {
    return this.carrinhoItensService.create(createCarrinhoItensDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCarrinhoItensDto: UpdateCarrinhoItensDto,
  ): Promise<any> {
    return this.carrinhoItensService.update(id, updateCarrinhoItensDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.carrinhoItensService.delete(id);
  }
}
