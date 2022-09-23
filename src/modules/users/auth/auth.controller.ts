import { AuthService } from './auth.service';
import {
	registerValidation,
	loginValidation,
} from '../../../common/_helpers/users/user.validators';
import { UserService } from '../user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ResponseDTO } from 'src/common/_DTO/response.dto';
import { JoiValidationPipe } from '../../../common/_helpers/joi-validation-pipe';
import { RegisterDTO } from '../dto/user.dto';
import {
	LoginDTO,
	PasswordRecoveryRequestDTO,
	ChangePasswordDTO,
} from '../dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller()
export class AuthController {
	constructor(
		private userService: UserService,
		private authService: AuthService,
	) {}

	@Post('register')
	async createUser(
		@Body(new JoiValidationPipe(registerValidation)) user: RegisterDTO,
	): Promise<ResponseDTO> {
		const message = await this.userService.createUser(user);

		return {
			message: message,
			data: {},
		};
	}

	@Post('login')
	async login(
		@Body(new JoiValidationPipe(loginValidation)) credentials: LoginDTO,
	): Promise<ResponseDTO> {
		console.log(credentials, 'credenciales');
		const sesion = await this.userService.login(credentials);
		return {
			message: `Welcome ${sesion.firstName} ${sesion.lastName}`,
			data: sesion,
		};
	}

	@Post('forgotPassword')
	async passwordRecoveryRequest(
		@Body() passwordRequest: PasswordRecoveryRequestDTO,
	): Promise<ResponseDTO> {
		try {
			const response = await this.authService.forgotPassword(
				passwordRequest.email,
			);

			return {
				message: 'Email enviado',
				data: response,
			};
		} catch (err) {
			return {
				message: 'Error',

				data: err,
			};
		}
	}

	@Post('resetPassword')
	async resetPassword(
		@Body() changePassword: ChangePasswordDTO,
	): Promise<ResponseDTO> {
		const result = await this.authService.resetPassword(changePassword);

		if (!result.status) {
			return {
				message: 'Error!',
				data: result.data,
			};
		}

		return {
			message: 'Successful!',
			data: result.data,
		};
	}
}
