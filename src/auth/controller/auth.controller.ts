import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() CreateLoginDto: { email: string; senha: string }) {
    const user = await this.authService.validateLogin(
      CreateLoginDto.email,
      CreateLoginDto.senha,
    );
    if (!user) {
      throw new NotFoundException('Credenciais inválidas');
    }
    return this.authService.logar(user);
  }
}
