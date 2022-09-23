import { JwtModule } from '@nestjs/jwt';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/users/user.controller';
import { UserModule } from './modules/users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SuscriptionsController } from './modules/suscriptions/suscriptions.controller';
import { MedicalStoriesController } from './modules/medical-stories/medical-stories.controller';
import { ServicesController } from './modules/services/services.controller';

import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { ServiceModule } from './modules/services/services.module';
import { SuscriptionsModule } from './modules/suscriptions/suscriptions.module';
import { MedicalStoriesModule } from './modules/medical-stories/medical-stories.module';
dotenv.config({ path: resolve(__dirname, '../.env') });

@Module({
	imports: [
		UserModule,
		CacheModule.register({
			ttl: Number(process.env.TIME_RESTOR_PASSWORD_CODE),
			isGlobal: true,
		}),
		MongooseModule.forRoot(
			`${process.env.DB_PLATFORM}://${process.env.DB_SERVER}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
		),
		JwtModule.register({ secret: 'hard!to-guess_secret' }),
		ServiceModule,
		SuscriptionsModule,
		MedicalStoriesModule,
	],

	controllers: [
		AppController,
		UserController,
		SuscriptionsController,
		MedicalStoriesController,
		ServicesController,
	],

	providers: [AppService],
})
export class AppModule {}
