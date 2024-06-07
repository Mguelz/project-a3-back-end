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

@Controller('ingresso')
export class IngressoController {
  constructor(private readonly ingressoService: IngressoService) {}

  //   @Post()
  //   async create(
  //     @Body() createIngressoDto: CreateIngressoDto,
  //   ): Promise<IngressoEntity> {
  //     return this.ingressoService.create(createIngressoDto);
  //   }
  @Get()
  async findAll(): Promise<any[]> {
    return this.ingressoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.ingressoService.findOne(id);
  }

  @Post()
  async create(@Body() createIngressoDto: CreateIngressoDto): Promise<any> {
    return this.ingressoService.create(createIngressoDto);
  }

  //   @Put(':id')
  //   async update(
  //     @Param('id') id: number,
  //     @Body() UpdateIngressoDto: CreateIngressoDto,
  //   ): Promise<any> {
  //     return this.ingressoService.update(id, UpdateIngressoDto);
  //   }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.ingressoService.delete(id);
  }
}
