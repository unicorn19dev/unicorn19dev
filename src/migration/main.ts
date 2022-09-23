import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MigrationModule } from './migrate/migration.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(
		MigrationModule,
	);
	app.enableCors();
}

bootstrap();
