import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { ServerModule } from 'src/server/server.module';
import { JwtAuthGuard } from './auth/jwt/jwt.guard';
import { RolesGuard } from './guards/role.guard';
import { logger } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('App Catalog')
    .setDescription('Honeywell application catalog service')
    .setVersion('1.0')
    .addTag('HCE')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.use(logger);
  app.useGlobalGuards(new JwtAuthGuard(), new RolesGuard(new Reflector()));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
