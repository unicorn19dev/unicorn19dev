import { MongooseModule } from '@nestjs/mongoose';

import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth/auth.service';

import { UserService } from './user.service';

import { UserSchema } from './schemas/user.schema';

import { ResetTokenSchema } from './schemas/resetToken.schema';

import { UserController } from './user.controller';

import { AuthController } from './auth/auth.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Users',

				schema: UserSchema,
			},

			{
				name: 'ResetToken',

				schema: ResetTokenSchema,
			},
		]),

		JwtModule.register({ secret: 'hard!to-guess_secret' }),
	],

	controllers: [UserController, AuthController],

	providers: [UserService, AuthService],

	exports: [AuthService, UserService],
})
export class UserModule {}