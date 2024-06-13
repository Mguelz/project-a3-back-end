import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PerfilService } from '../service/perfil.service';
import { CreatePerfilDto, UpdatePerfilDto } from '../dto/perfil.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('perfil')
@ApiTags('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os perfis' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findAll(): Promise<any[]> {
    return this.perfilService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um perfil' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findOne(@Param('id') id: number): Promise<any> {
    return this.perfilService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um Perfil' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async create(@Body() createPerfilDto: CreatePerfilDto): Promise<any> {
    return this.perfilService.create(createPerfilDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um Perfil' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async update(
    @Param('id') id: number,
    @Body() updatePerfilDto: UpdatePerfilDto,
  ): Promise<any> {
    return this.perfilService.update(id, updatePerfilDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um perfil' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.perfilService.delete(id);
  }
}
