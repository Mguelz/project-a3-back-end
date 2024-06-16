import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { IngressoService } from '../service/ingresso.service';
import { CreateIngressoDto, UpdateIngressoDto } from '../dto/ingresso.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('ingresso')
@ApiTags('ingresso')
export class IngressoController {
  constructor(private readonly ingressoService: IngressoService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os ingressos' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findAll(): Promise<any[]> {
    return this.ingressoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um ingresso' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findOne(@Param('id') id: number): Promise<any> {
    return this.ingressoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um ingresso' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async create(@Body() createIngressoDto: CreateIngressoDto): Promise<any> {
    return this.ingressoService.create(createIngressoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um ingresso' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async update(
    @Param('id') id: number,
    @Body() UpdateIngressoDto: CreateIngressoDto,
  ): Promise<any> {
    return this.ingressoService.update(id, UpdateIngressoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um ingresso' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.ingressoService.delete(id);
  }
}
