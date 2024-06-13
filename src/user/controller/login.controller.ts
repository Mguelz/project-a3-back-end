import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { LoginService } from '../service/login.service';
import { CreateLoginDto, UpdateLoginDto } from '../dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('login')
@ApiTags('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os Logins' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findAll(): Promise<any[]> {
    return this.loginService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um Login' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async findOne(@Param('id') id: number): Promise<any> {
    return this.loginService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um Login' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async create(@Body() createLoginDto: CreateLoginDto): Promise<any> {
    return this.loginService.create(createLoginDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um Login' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async update(
    @Param('id') id: number,
    @Body() updateLoginDto: UpdateLoginDto,
  ): Promise<any> {
    return this.loginService.update(id, updateLoginDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um Login' })
  @ApiResponse({ status: 500, description: 'Success.' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.loginService.delete(id);
  }
}
