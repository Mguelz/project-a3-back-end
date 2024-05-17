import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PerfilService } from '../service/perfil.service';
import { CreatePerfilDto, UpdatePerfilDto } from '../dto/perfil.dto';

@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.perfilService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.perfilService.findOne(id);
  }

  @Post()
  async create(@Body() createPerfilDto: CreatePerfilDto): Promise<any> {
    return this.perfilService.create(createPerfilDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePerfilDto: UpdatePerfilDto,
  ): Promise<any> {
    return this.perfilService.update(id, updatePerfilDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.perfilService.delete(id);
  }
}
