import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);

  app.enableCors();
  app.use(helmet());
  app.use(compression());

  // global filters
  app.useGlobalFilters(new GlobalExceptionFilter());

  // swagger
  const APP_NAME = configService.get('APP_NAME');
  const APP_DESCRIPTION = configService.get('APP_DESCRIPTION');
  const API_VERSION = configService.get('API_VERSION', 'v1');
  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(API_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('/', app, document);

  const PORT = configService.get('APP_PORT') || 3000;
  const HOST = configService.get('APP_HOST');
  await app.listen(PORT);
  Logger.log(`🚀  Server ready at ${HOST}:${PORT}`);
}
bootstrap();
