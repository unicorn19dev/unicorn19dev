import { ChangePasswordDTO } from './../dto/user.dto';
import { User, ResetToken } from './../interfaces/user';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from './../user.service';
import { Injectable } from '@nestjs/common';
import { sendEmail, encrypt } from 'src/_helpers/utils';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel('Users') private userModel: Model<User>,
		@InjectModel('ResetToken') private resetTokenModel: Model<ResetToken>,
		private readonly userService: UserService,
	) {}

	async forgotPassword(
		email: string,
	): Promise<{ status: boolean; data: any }> {
		const user: User = await this.userModel.findOne({ email });

		if (user) {
			let searchCode = true;
			let token = '';
			do {
				const tmpToken = await this.userService.generateToken(
					user.email,
					'3600',
				);

				token = tmpToken.token;
				const record: ResetToken = await this.resetTokenModel.findOne({
					token,
				});

				if (!record) {
					searchCode = false;
				}
			} while (searchCode);

			const clientURL = process.env.URL;
			const link = `${clientURL}?token=${token}&email=${user.email}`;
			const existToken = await this.resetTokenModel.findOne({ email });

			if (existToken) {
				await this.resetTokenModel.findOneAndUpdate(
					{ email },
					{ token },
					{ new: true },
				);
			} else {
				const newToken = new this.resetTokenModel({ token, email });
				newToken.save();
			}

			const type = 'web'; // desde donde se hace la petición
			let template = '';
			let params = {};
			if (type) {
				template = 'views/templates/resetPassMobile.hbs';
				params = { name: user.firstName + user.lastName, token };
			} else {
				template = 'views/templates/resetEmail.hbs';
				params = { name: user.firstName + user.lastName, link };
			}

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
			const tokenFound: ResetToken = await this.resetTokenModel.findOne({
				token: data.token,
			});

			if (!tokenFound || tokenFound.token !== data.token) {
				return {
					status: false,
					data: 'Token incorrecto o vencido. Solicite un nuevo código',
				};
			}

			const newPassword = encrypt(data.newPassword);

			await this.userModel.findOneAndUpdate(
				{ email: tokenFound.email },
				{ password: newPassword },
			);

			await this.resetTokenModel.deleteOne({ email: tokenFound.email });

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
