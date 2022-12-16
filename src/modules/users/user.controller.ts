import { ResponseDTO } from '../../common/_DTO/response.dto';
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	async getUsers(): Promise<ResponseDTO> {
		const users = await this.userService.getUsers();

		return {
			message: 'Users',

			data: users,
		};
	}

	@Get(':id')
	getUser(@Param() id): ResponseDTO {
		return {
			message: 'user information',

			data: this.userService.getUserById(id),
		};
	}

	@Put(':id')
	async updateUser(@Body() user, @Param() id): Promise<ResponseDTO> {
		try {
			const newUser = await this.userService.updateUser(id.id, user);
			return {
				message: 'User edited',

				data: newUser,
			};
		} catch (err) {
			return {
				message: 'Error',

				data: err,
			};
		}
	}

	@Delete(':id')
	deleteUser(@Param() id): ResponseDTO {
		return {
			message: 'user deleted',

			data: {},
		};
	}
}
