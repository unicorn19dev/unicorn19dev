import { JwtService } from '@nestjs/jwt';
import { User } from './interfaces/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDTO, LoginDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { encrypt } from 'src/common/_helpers/utils';
@Injectable()
export class UserService {
	constructor(
		@InjectModel('Users') private userModel: Model<User>,
		private readonly jwtService: JwtService,
	) {}

	async createUser(user: RegisterDTO): Promise<string> {
		const userFound = await this.userModel.findOne({ email: user.email });
		if (userFound) {
			return 'Error! Email registrered already';
		}

		user.password = encrypt(user.password);
		const newUser = new this.userModel(user);
		newUser.save();

		return 'User created successfully';
	}

	async login(credentials: LoginDTO): Promise<any> {
		const user: User = await this.userModel.findOne({
			email: credentials.email,
		});
		console.log(credentials, 'credenciales');
		if (!user) {
			throw new HttpException(
				{
					status: HttpStatus.NOT_FOUND,
					error: 'Unregistered user',
				},

				HttpStatus.NOT_FOUND,
			);
		}

		const valid = await this.validatePassword(
			credentials.password,
			user.password,
		);

		if (!valid) {
			throw new HttpException(
				{
					status: HttpStatus.UNAUTHORIZED,
					error: 'Incorrect password',
				},

				HttpStatus.UNAUTHORIZED,
			);
		}
		const token = this.generateToken(user.id);
		const userSesion = await this.userModel.findOneAndUpdate(
			{ email: user.email },
			{ token: token.token },
			{ new: true },
		);
		const sesion = {
			email: userSesion.email,
			firstName: userSesion.firstName,
			lastName: userSesion.lastName,
			role: userSesion.role,
			token: userSesion.token,
		};
		return { user: sesion };
	}

	async getUsers(): Promise<User[]> {
		const users = await this.userModel.find();
		return users;
	}

	getUserByEmail(email: string) {
		return this.userModel.findOne({ email });
	}

	getUserById(id: string) {
		return this.userModel.findOne({ _id: id });
	}

	/** UTILS **/
	generateToken(userId: any) {
		const payload = { userId };
		console.log(payload);
		return {
			token: this.jwtService.sign(payload),
		};
	}

	async validatePassword(
		password: string,

		passwordReceived: string,
	): Promise<boolean> {
		return await bcrypt.compareSync(password, passwordReceived);
	}
}
