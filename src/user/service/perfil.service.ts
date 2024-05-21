import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerfilEntity } from '../entity/perfil.entity';
import { CreatePerfilDto, UpdatePerfilDto } from '../dto/perfil.dto';
import { LoginEntity } from '../entity/login.entity';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(PerfilEntity)
    private readonly perfilRepository: Repository<PerfilEntity>,
  ) {}

  async findAll(): Promise<PerfilEntity[]> {
    return await this.perfilRepository.find({ relations: ['login'] });
  }

  async findOne(id: number): Promise<PerfilEntity> {
    const user = await this.perfilRepository.findOne({
      where: { id_perfil: id },
      relations: ['login'],
    });

    if (!user) {
      throw new HttpException(`Usuário não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(createPerfilDto: CreatePerfilDto): Promise<PerfilEntity> {
    try {
      // Crie um novo objeto PerfilEntity e atribua os valores do DTO a ele
      const perfil = new PerfilEntity();
      perfil.nome = createPerfilDto.nome;
      perfil.cpf = createPerfilDto.cpf;
      perfil.data_nascimento = createPerfilDto.data_nascimento;
      perfil.cargo = createPerfilDto.cargo;

      // Se o login estiver presente no DTO, você também precisa criar um objeto de LoginEntity correspondente
      if (createPerfilDto.login) {
        const login = new LoginEntity();
        login.email = createPerfilDto.login.email;
        login.senha = createPerfilDto.login.senha;

        // Defina o login no perfil
        perfil.login = login;
      }
      return await this.perfilRepository.save(
        this.perfilRepository.create(createPerfilDto),
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'Algum dado inserido ja esta cadastrado.',
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

  async update(id: number, updatePerfilDto: UpdatePerfilDto): Promise<void> {
    const result = await this.perfilRepository.update(id, updatePerfilDto);
    if (result.affected === 0) {
      throw new HttpException('Perfil não encontrado.', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.perfilRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Perfil não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }
}
