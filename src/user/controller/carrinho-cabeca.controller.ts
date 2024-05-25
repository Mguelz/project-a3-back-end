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

@Controller('carrinho-cabeca')
export class CarrinhoCabecaController {
  constructor(private readonly carrinhoCabecaService: CarrinhoCabecaService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.carrinhoCabecaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.carrinhoCabecaService.findOne(id);
  }

  @Post()
  async create(
    @Body() createCarrinhoCabecaDto: CreateCarrinhoCabecaDto,
  ): Promise<any> {
    return this.carrinhoCabecaService.create(createCarrinhoCabecaDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCarrinhoCabecaDto: UpdateCarrinhoCabecaDto,
  ): Promise<any> {
    return this.carrinhoCabecaService.update(id, updateCarrinhoCabecaDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.carrinhoCabecaService.delete(id);
  }
}
