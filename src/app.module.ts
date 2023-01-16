import { RoleGuard } from './modules/users/roles/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/users/user.controller';
import { UserModule } from './modules/users/user.module';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { ServiceModule } from './modules/services/services.module';
import { SuscriptionsModule } from './modules/suscriptions/suscriptions.module';
import { MedicalStoriesModule } from './modules/medical-stories/medical-stories.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { AppointmentService } from './modules/appointment/appointment.service';
import { APP_GUARD } from '@nestjs/core';
dotenv.config({ path: resolve(__dirname, '../.env') });

@Module({
	imports: [
		CacheModule.register({
			ttl: Number(process.env.TIME_RESTOR_PASSWORD_CODE),
			isGlobal: true,
		}),
		MongooseModule.forRoot(
			`${process.env.DB_PLATFORM}://${process.env.DB_SERVER}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
		),
		JwtModule.register({ secret: 'hard!to-guess_secret' }),
		UserModule,
		ServiceModule,
		SuscriptionsModule,
		MedicalStoriesModule,
		AppointmentModule,
	],

	controllers: [AppController],

	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: RoleGuard,
		},
	],
})
export class AppModule {}
