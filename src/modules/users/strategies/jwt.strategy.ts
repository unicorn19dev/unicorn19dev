import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AdminUser, User } from '../dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectModel('Users')
		private readonly UserSchema: Model<User>,
		@InjectModel('AdminUsers')
		private readonly UserAdminSchema: Model<AdminUser>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'hard!to-guess_secret',
		});
	}

	async validate(payload: any) {
		let user = null;
		user = await this.UserSchema.findById(payload.id);
		if (!user) {
			user = await this.UserAdminSchema.findById(payload.id);
		}
		return user;
	}
}
