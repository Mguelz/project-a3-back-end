import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { GeneroService } from '../service/genero.service';
import { GeneroEntity } from '../entity/genero.entity';
import { CreateGeneroDto } from '../dto/genero.dto';

@Controller('genero')
export class GeneroController {
  constructor(private generoService: GeneroService) {}

  @Get()
  async findAll(): Promise<GeneroEntity[]> {
    return this.generoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<GeneroEntity> {
    return this.generoService.findOne(id);
  }

  @Post()
  async create(
    @Body() createGeneroDto: CreateGeneroDto,
  ): Promise<GeneroEntity> {
    return this.generoService.create(createGeneroDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateGeneroDto: CreateGeneroDto,
  ): Promise<void> {
    return this.generoService.update(id, updateGeneroDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.generoService.delete(id);
  }
}
