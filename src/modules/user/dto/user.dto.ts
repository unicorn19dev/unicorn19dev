import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
	@ApiProperty()
	firstName: string;

	@ApiProperty()
	lastName: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	password: string;

	@ApiProperty()
	role: string;

	codeId?: string;

	city?: string;

	address?: string;

	phone?: {
		code: string;

		phoneNumber: string;
	};

	medicalCode?: string;
}

export class LoginDTO {
	@ApiProperty()
	email: string;

	@ApiProperty()
	password: string;
}

export class PasswordRecoveryRequestDTO {
	@ApiProperty()
	email: string;
}

export class ChangePasswordDTO {
	@ApiProperty()
	newPassword: string;

	@ApiProperty()
	token: string;

	@ApiProperty()
	email: string;
}
