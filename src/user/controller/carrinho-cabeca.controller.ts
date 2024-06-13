import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CarrinhoCabecaService } from '../service/carrinho-cabeca.service';
import {
  CreateCarrinhoCabecaDto,
  UpdateCarrinhoCabecaDto,
} from '../dto/carrinho-cabeca.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('carrinho-cabeca')
@ApiTags('carrinho-cabeca')
export class CarrinhoCabecaController {
  constructor(private readonly carrinhoCabecaService: CarrinhoCabecaService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os carrinhoCabeca' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findAll(): Promise<any[]> {
    return this.carrinhoCabecaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um carrinhoCabeca' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findOne(@Param('id') id: number): Promise<any> {
    return this.carrinhoCabecaService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo carrinhoCabeca' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async create(
    @Body() createCarrinhoCabecaDto: CreateCarrinhoCabecaDto,
  ): Promise<any> {
    return this.carrinhoCabecaService.create(createCarrinhoCabecaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um carrinhoCabeca' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async update(
    @Param('id') id: number,
    @Body() updateCarrinhoCabecaDto: UpdateCarrinhoCabecaDto,
  ): Promise<any> {
    return this.carrinhoCabecaService.update(id, updateCarrinhoCabecaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um carrinhoCabeca' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.carrinhoCabecaService.delete(id);
  }
}
