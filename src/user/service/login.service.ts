import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginEntity } from '../entity/login.entity';
import { Repository } from 'typeorm';
import { CreateLoginDto, UpdateLoginDto } from '../dto/login.dto';
import * as bcryptj from 'bcryptjs';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)
    private loginRepository: Repository<LoginEntity>,
  ) {}

  async findAll(): Promise<LoginEntity[]> {
    return await this.loginRepository.find({
    });
  }

  async findOne(id: number): Promise<LoginEntity> {
    const login = await this.loginRepository.findOne({
      where: { id_login: id },
    });
    if (!login) {
      throw new HttpException(`Usuário não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return login;
  }
  
  async create(createLoginDto: CreateLoginDto): Promise<LoginEntity> {
    try {
      // criptografando a senha
      const salt0rRounds = 10;
      const hash = await bcryptj.hash(createLoginDto.senha, salt0rRounds);
      createLoginDto.senha = hash;

      return await this.loginRepository.save(
        this.loginRepository.create(createLoginDto),
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'Há registros repetidos.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Erro ao criar o registro. Tente novamente mais tarde.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async update(id: number, updateLoginDto: UpdateLoginDto): Promise<void> {
    const result = await this.loginRepository.update(id, updateLoginDto);
    if (result.affected === 0) {
      throw new HttpException(`Login não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.loginRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Login não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }
}
