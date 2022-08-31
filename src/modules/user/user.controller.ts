import { ResponseDTO } from '../../common/_DTO/response.dto';

import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';

import { UserService } from './user.service';

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
	updateUser(@Body() user, @Param() id): ResponseDTO {
		return {
			message: 'User edited',

			data: {},
		};
	}

	@Delete(':id')
	deleteUser(@Param() id): ResponseDTO {
		return {
			message: 'user deleted',

			data: {},
		};
	}
}
