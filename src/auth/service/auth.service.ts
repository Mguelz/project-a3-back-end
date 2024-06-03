import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginEntity } from 'src/user/entity/login.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(LoginEntity)
    private loginRepository: Repository<LoginEntity>,
    private jwtService: JwtService,
  ) {}

  // compara se a senha fornecida é a mesma que esta armazenada no banco
  async validateLogin(email: string, senha: string): Promise<any> {
    const login = await this.loginRepository.findOne({ where: { email } });
    if (login && (await bcrypt.compare(senha, login.senha))) {
      const { senha, ...result } = login;
      return result;
    }
    return null;
  }

  async logar(LoginEntity: any) {
    const payload = { username: LoginEntity.email, sub: LoginEntity.id_login };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
