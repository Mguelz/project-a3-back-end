import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LoginService } from '../service/login.service';
import { CreateLoginDto, UpdateLoginDto } from '../dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.loginService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.loginService.findOne(id);
  }

  @Post()
  async create(@Body() createLoginDto: CreateLoginDto): Promise<any> {
    return this.loginService.create(createLoginDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLoginDto: UpdateLoginDto,
  ): Promise<any> {
    return this.loginService.update(id, updateLoginDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.loginService.delete(id);
  }
}
