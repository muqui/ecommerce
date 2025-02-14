import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('ecommerce muqui')
  .setDescription('ecommerce-muqui')
  .setVersion('1.0')
  //.addTag('ecommerce')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT', // Opcional pero recomendado
    },
    'JWT', // Nombre de la estrategia de autenticación
  )
  .build();
const document = SwaggerModule.createDocument(app, config);

  

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.useGlobalPipes(new ValidationPipe())
  app.use(loggerGlobal);
  await app.listen(3000);
}
bootstrap();
