import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whitelist = ['http://localhost:45627'];

  app.enableCors();

  /**
   * Documentacion
   */
  const options = new DocumentBuilder()
    .setTitle('Vetmergencia')
    .setDescription('This is my description')
    .setVersion('1.0.0')
    .addTag('vetmergencia')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
  await app.listen(3000);
}
bootstrap();
console.log(process.env.DB_DATABASE);
