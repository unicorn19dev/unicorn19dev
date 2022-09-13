import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, RegisterDTO, LoginDTO } from './dto/user.dto';
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
		const { token } = this.generateToken(user.id);
		const sesion = {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role,
			token,
		};
		return { ...sesion };
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