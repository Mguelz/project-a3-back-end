import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateCatalogoDto, UpdateCatalogoDto } from '../dto/catalogo.dto';
import { CatalogoService } from '../service/catalogo-cabeca.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('catalogo')
@ApiTags('catalago')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os catalogos' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findAll(): Promise<any[]> {
    return this.catalogoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um catalogo' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findOne(@Param('id') id: number): Promise<any> {
    return this.catalogoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um catalogo' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async create(@Body() createCatalogoDto: CreateCatalogoDto): Promise<any> {
    return this.catalogoService.create(createCatalogoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um catalogo' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async update(
    @Param('id') id: number,
    @Body() updateCatalogoDto: UpdateCatalogoDto,
  ): Promise<any> {
    return this.catalogoService.update(id, updateCatalogoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um catalogo' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.catalogoService.delete(id);
  }
}
