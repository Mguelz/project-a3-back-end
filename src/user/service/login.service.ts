import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginEntity } from '../entity/login.entity';
import { Repository } from 'typeorm';
import { CreateLoginDto, UpdateLoginDto } from '../dto/login.dto';
import { PerfilEntity } from '../entity/perfil.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)
    private loginRepository: Repository<LoginEntity>,
    // @InjectRepository(PerfilEntity)
    // private perfilRepository: Repository<PerfilEntity>,
  ) {}

  async findAll(): Promise<LoginEntity[]> {
    return await this.loginRepository.find({
      relations: ['perfil'],
    });
  }

  async findOne(id: number): Promise<LoginEntity> {
    const login = await this.loginRepository.findOne({
      where: { id_login: id },
      relations: ['perfil'],
    });
    if (!login) {
      throw new HttpException(`Usuário não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return login;
  }
  
  async create(createLoginDto: CreateLoginDto): Promise<LoginEntity> {
    try {
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
  
  // async create(createLoginDto: CreateLoginDto): Promise<LoginEntity> {
  //   const perfil = new PerfilEntity();
  //   perfil.nome = createLoginDto.perfil.nome;
  //   perfil.cpf = createLoginDto.perfil.cpf;
  //   perfil.data_nascimento = new Date(createLoginDto.perfil.data_nascimento);
  //   perfil.cargo = createLoginDto.perfil.cargo;

  //   const savedPerfil = await this.perfilRepository.save(perfil);

  //   const login = new LoginEntity();
  //   login.email = createLoginDto.email;
  //   login.senha = createLoginDto.senha;
  //   login.perfil = savedPerfil;

  //   try {
  //     return await this.loginRepository.save(login);
  //   } catch (error) {
  //     if (error.code === 'ER_DUP_ENTRY') {
  //       throw new HttpException(
  //         'Email ou CPF já estão em uso.',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     } else {
  //       throw new HttpException(
  //         'Erro ao criar o login. Tente novamente mais tarde.',
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }
  // }

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
