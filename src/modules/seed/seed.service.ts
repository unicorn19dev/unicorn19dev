import { VersionDB } from './dto/version.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { encrypt } from 'src/common/_helpers/utils';
import { User } from '../users/dto/user.dto';

@Injectable()
export class SeedService {
	constructor(
		@InjectModel('Users') private userModel: Model<User>,
		@InjectModel('VersionDB') private versionDBModel: Model<VersionDB>,
	) {}

	async loadInitialDBState() {
		const password = encrypt('12345678');

		const user = {
			firstName: 'admin',
			lastName: 'vetmergencia',
			email: 'admin@vetmergencia.com',
			password,
			role: 'admin',
		};
		const versions = await this.versionDBModel.find();

		if (versions.length) {
			return;
		}

		const newUser = new this.userModel(user);
		newUser.save();
		new this.versionDBModel({ version: '1.0.0' }).save();
	}
}
