import { messages } from './../../../common/_helpers/messages';
import { ChangePasswordDTO, User } from '../dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user.service';
import {
	CACHE_MANAGER,
	HttpException,
	Inject,
	Injectable,
	HttpStatus,
} from '@nestjs/common';
import { sendEmail, encrypt } from 'src/common/_helpers/utils';
import { Model } from 'mongoose';
import { generateCode } from '../../../common/_helpers/utils';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel('Users') private userModel: Model<User>,
		private readonly userService: UserService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
	) {}

	async forgotPassword(
		email: string,
	): Promise<{ status: boolean; data: any }> {
		const user: User = await this.userModel.findOne({ email });

		if (user) {
			const token = await generateCode();
			await this.cacheManager.set(email, token, { ttl: 300 });

			const clientURL = process.env.URL;
			const link = `${clientURL}resetPassword?email=${user.email}`;

			let template = '';
			let params = {};

			template = 'views/templates/resetEmail.hbs';
			params = { name: user.firstName + user.lastName, token, link };

			return await sendEmail(
				user.email,
				'Vetmergencia - Recuperación de contraseña',
				params,
				template,
			);
		}
	}

	async resetPassword(
		data: ChangePasswordDTO,
	): Promise<{ status: boolean; data: any }> {
		try {
			const code = await this.cacheManager.get(data.email);
			if (code !== data.token) {
				throw new HttpException(
					messages.ERROR_RESTORE_CODE_NO_MATCH,
					HttpStatus.BAD_REQUEST,
				);
			}
			this.cacheManager.del(data.email);
			const newPassword = encrypt(data.newPassword);

			await this.userModel.findOneAndUpdate(
				{ email: data.email },
				{ password: newPassword },
			);

			return {
				status: true,
				data: 'Contraseña cambiada exitosamente',
			};
		} catch (err) {
			return {
				status: false,
				data: err,
			};
		}
	}
}
