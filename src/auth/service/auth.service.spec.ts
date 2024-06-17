import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginEntity } from 'src/user/entity/login.entity';

// Mockando a entidade Login para evitar dependências de banco de dados reais.
jest.mock('src/user/entity/login.entity', () => {
  return { LoginEntity: class LoginEntity {} };
});

// Mockando Repositório e Serviços
const loginRepository = {
  findOne: jest.fn(),
};

const jwtService = {
  sign: jest.fn().mockReturnValue('mockedJwtToken'),
  verify: jest.fn(),
  decode: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(LoginEntity),
          useValue: loginRepository,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('validateLogin', () => {
    it('deve retornar dados do usuário sem a senha se o email e a senha forem válidos', async () => {
      const login = {
        id_login: 1,
        email: 'test@example.com',
        senha: await bcrypt.hash('password', 10),
      };
      loginRepository.findOne.mockResolvedValue(login);

      const result = await service.validateLogin(
        'test@example.com',
        'password',
      );
      expect(result).toEqual({
        id_login: 1,
        email: 'test@example.com',
      });
    });

    it('deve retornar null se a senha for inválida', async () => {
      const login = {
        id_login: 1,
        email: 'test@example.com',
        senha: await bcrypt.hash('password', 10),
      };
      loginRepository.findOne.mockResolvedValue(login);

      const result = await service.validateLogin(
        'test@example.com',
        'wrongpassword',
      );
      expect(result).toBeNull();
    });

    it('deve retornar null se o usuário não for encontrado', async () => {
      loginRepository.findOne.mockResolvedValue(null);
      const result = await service.validateLogin(
        'nonexistent@example.com',
        'password',
      );
      expect(result).toBeNull();
    });
  });

  describe('logar', () => {
    it('deve retornar um token de acesso', async () => {
      const login = { id_login: 1, email: 'test@example.com' };
      const result = await service.logar(login);

      expect(result).toEqual({ access_token: 'mockedJwtToken' });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: login.email,
        sub: login.id_login,
      });
    });
  });
});
// describe('AuthService', () => {
//   let service: AuthService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [AuthService],
//     }).compile();

//     service = module.get<AuthService>(AuthService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
