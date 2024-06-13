import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { GeneroService } from '../service/genero.service';
import { CreateGeneroDto, UpdateGeneroDto } from '../dto/genero.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('genero')
@ApiTags('genero')
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os generos' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findAll(): Promise<any[]> {
    return this.generoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um genero' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findOne(@Param('id') id: number): Promise<any> {
    return this.generoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um genero' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async create(@Body() createGeneroDto: CreateGeneroDto): Promise<any> {
    return this.generoService.create(createGeneroDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um genero' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async update(
    @Param('id') id: number,
    @Body() updateGeneroDto: UpdateGeneroDto,
  ): Promise<any> {
    return this.generoService.update(id, updateGeneroDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um genero' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.generoService.delete(id);
  }
}
