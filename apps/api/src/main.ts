import './polyfills';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve uploaded event photos as static assets at /uploads
  // process.cwd() = workspace root when running via `nx serve api`
  app.useStaticAssets(join(process.cwd(), 'apps', 'api', 'uploads'), {
    prefix: '/uploads',
    setHeaders: (res: any) => { res.setHeader('Access-Control-Allow-Origin', '*'); },
  });

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000', 'capacitor://localhost', 'ionic://localhost', 'http://localhost'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Mobile App API')
    .setDescription('B2C Mobile App Backend API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('api');

  const PORT = process.env.PORT || 3333;
  await app.listen(PORT, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api/docs`);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
