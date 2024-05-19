import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CatalogoService } from '../service/catalogo.service';
import { CreateCatalogoDto } from '../dto/catalogo-cabeca.dto';

@Controller('catalogo')
export class CatalogoController {
  constructor(private catalogoService: CatalogoService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.catalogoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.catalogoService.findOne(id);
  }

  @Post()
  async create(@Body() createCatalogoDto: CreateCatalogoDto): Promise<any> {
    return this.catalogoService.create(createCatalogoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCatalogoDto: CreateCatalogoDto,
  ): Promise<any> {
    return this.catalogoService.update(id, updateCatalogoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.catalogoService.delete(id);
  }
}