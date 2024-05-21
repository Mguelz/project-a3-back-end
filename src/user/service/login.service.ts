import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginEntity } from '../entity/login.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoginDto, UpdateLoginDto } from '../dto/login.dto';
import { PerfilEntity } from '../entity/perfil.entity';
import { CarrinhoCabecaEntity } from '../entity/carrinho-cabeca.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)
    private readonly loginRepository: Repository<LoginEntity>,

    @InjectRepository(PerfilEntity)
    private readonly PerfilEntity: Repository<PerfilEntity>,
  ) {}

  async findAll(): Promise<LoginEntity[]> {
    return await this.loginRepository.find();
  }

  async findOne(id: number): Promise<PerfilEntity> {
    const user = await this.PerfilEntity.findOne({
      where: { id_perfil: id },
      relations: ['perfil'],
    });

    if (!user) {
      throw new HttpException(`Usuário não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(createLoginDto: CreateLoginDto): Promise<LoginEntity> {
    try {
      const login = this.loginRepository.create(createLoginDto);
      return await this.loginRepository.save(login);
    } catch (error) {
      throw new HttpException(
        'Erro ao criar o registro. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateLoginDto: UpdateLoginDto): Promise<void> {
    const result = await this.loginRepository.update(id, updateLoginDto);
    if (result.affected === 0) {
      throw new HttpException('Login não encontrado.', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.loginRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Login não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }
}
