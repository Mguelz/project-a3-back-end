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

@Controller('genero')
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.generoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.generoService.findOne(id);
  }

  @Post()
  async create(@Body() createGeneroDto: CreateGeneroDto): Promise<any> {
    return this.generoService.create(createGeneroDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateGeneroDto: UpdateGeneroDto,
  ): Promise<any> {
    return this.generoService.update(id, updateGeneroDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.generoService.delete(id);
  }
}
