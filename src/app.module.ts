import { JwtModule } from '@nestjs/jwt';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/users/user.controller';
import { AuthService } from './modules/users/auth/auth.service';
import { UserService } from './modules/users/user.service';
import { UserModule } from './modules/users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './modules/users/schemas/user.schema';
import { VersionDBSchema } from './modules/seed/schemas/versionDB.schema';
import { SeedModule } from './modules/seed/seed.module';
import { SuscriptionsController } from './modules/suscriptions/suscriptions.controller';
import { MedicalHistoryController } from './modules/medical-history/medical-history.controller';
import { ServicesController } from './modules/services/services.controller';
import { SeedService } from './modules/seed/seed.service';

import * as dotenv from 'dotenv';
import { resolve } from 'path';
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
		MongooseModule.forFeature([
			{
				name: 'Users',
				schema: UserSchema,
			},
			{
				name: 'VersionDB',
				schema: VersionDBSchema,
			},
		]),
		JwtModule.register({ secret: 'hard!to-guess_secret' }),
		SeedModule,
	],

	controllers: [
		AppController,
		UserController,
		SuscriptionsController,
		MedicalHistoryController,
		ServicesController,
	],

	providers: [AppService, AuthService, UserService, SeedService],
})
export class AppModule {}
