import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(), // Using Fastify instead of Express
  );
  
  // Optional: Global prefix for REST routes
  app.setGlobalPrefix('api/v1');
  
  await app.listen(3000);
}
bootstrap();
