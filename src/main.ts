import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) =>
        new HttpException(
          {
            message: 'Entrada de dados Inválida',
            errors: errors,
          },
          HttpStatus.BAD_REQUEST,
        ),
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('ShowPot')
    .setDescription('API para gerenciamento de projetos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

// ValidationPipe
// 
// whitelist: Automaticamente remover dados de requisição que não têm decoradores explícitos no DTO.
// forbidNonWhitelisted: Lançar um erro quando forem recebidos dados extras não permitidos.
// transform: Transformar os objetos de entrada para o tipo de objeto de seus respectivos DTOs.
// exceptionFactory: Personalizar a resposta de erro para incluir detalhes sobre os erros de validação.
