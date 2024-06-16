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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('carrinho-itens')
@ApiTags('carrinho-itens')
export class CarrinhoItensController {
  constructor(private readonly carrinhoItensService: CarrinhoItensService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os carrinhoItem' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findAll(): Promise<any[]> {
    return this.carrinhoItensService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um carrinhoItem' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findOne(@Param('id') id: number): Promise<any> {
    return this.carrinhoItensService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um carrinhoItem' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async create(
    @Body() createCarrinhoItensDto: CreateCarrinhoItensDto,
  ): Promise<any> {
    return this.carrinhoItensService.create(createCarrinhoItensDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um carrinhoItem' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async update(
    @Param('id') id: number,
    @Body() updateCarrinhoItensDto: UpdateCarrinhoItensDto,
  ): Promise<any> {
    return this.carrinhoItensService.update(id, updateCarrinhoItensDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um carrinhoItem' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.carrinhoItensService.delete(id);
  }
}
