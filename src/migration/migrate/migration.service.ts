import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { encrypt } from '../../common/_helpers/utils';
import { AdminUser } from '../../modules/users/dto/user.dto';

interface VersionDBDto {
	version: number;
}
@Injectable()
export class MigrationService {
	constructor(
		@InjectModel('AdminUsers') private userModel: Model<AdminUser>,
		@InjectModel('VersionDB') private versionDBModel: Model<VersionDBDto>,
	) {
		this.loadInitialDBState();
	}

	async loadInitialDBState() {
		const password = encrypt('12345678');

		const user = {
			firstName: 'admin',
			lastName: 'vetmergencia',
			email: 'admin@vetmergencia.com',
			password,
			role: 'admin',
			status: 'active',
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
