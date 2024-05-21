import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginEntity } from '../entity/login.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoginDto, UpdateLoginDto } from '../dto/login.dto';
import { PerfilEntity } from '../entity/perfil.entity';
import { CarrinhoEntity } from '../entity/carrinho-cabeca.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)
    private readonly loginRepository: Repository<LoginEntity>,

    @InjectRepository(PerfilEntity)
    private readonly perfilRepository: Repository<PerfilEntity>,

    @InjectRepository(CarrinhoEntity)
    private readonly carrinhoCabecaRepository: Repository<CarrinhoEntity>,
  ) {}

  async findAll(): Promise<LoginEntity[]> {
    return await this.loginRepository.find({
      relations: ['perfil', 'carrinhoCabeca'],
    });
  }

  async findOne(id: number): Promise<LoginEntity> {
    const login = await this.loginRepository.findOne({
      where: { id_login: id },
      relations: ['perfil', 'carrinhoCabeca'],
    });
    if (!login) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }
    return login;
  }

  async create(createLoginDto: CreateLoginDto): Promise<LoginEntity> {
    try {
      const perfil = await this.perfilRepository.findOne({
        where: { id_perfil: createLoginDto.perfil.id_perfil },
      });

      if (!perfil) {
        throw new HttpException(`Perfil não encontrado.`, HttpStatus.NOT_FOUND);
      }

      if (!carrinhoCabeca) {
        throw new HttpException(
          `Carrinho Cabeça não encontrado.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const login = this.loginRepository.create({
        ...createLoginDto,
        perfil: perfil,
        carrinhoCabeca: CarrinhoEntity,
      });

      return await this.loginRepository.save(login);
    } catch (error) {
      throw new HttpException(
        'Erro ao criar o registro. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateLoginDto: UpdateLoginDto): Promise<void> {
    const perfil = await this.perfilRepository.findOne({
      where: { id_perfil: updateLoginDto.perfil.id_perfil },
    });

    if (!perfil) {
      throw new HttpException(`Perfil não encontrado.`, HttpStatus.NOT_FOUND);
    }
    const carrinhoCabeca = await this.carrinhoCabecaRepository.findOne({
      where: {
        id_carrinhoCabeca: updateLoginDto.carrinhoCabeca.id_carrinhoCabeca,
      },
    });

    if (!carrinhoCabeca) {
      throw new HttpException(
        `Carrinho Cabeça não encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.loginRepository.update(id, {
      ...updateLoginDto,
      perfil: perfil,
      carrinhoCabeca: carrinhoCabeca,
    });

    if (result.affected === 0) {
      throw new HttpException('Login não encontrado.', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.loginRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Usuário não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }
}
