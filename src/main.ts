import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors();
	app.setGlobalPrefix('api');

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
	await app.listen(process.env.SERVER_PORT || 3001);
}

bootstrap();
