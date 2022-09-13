import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class Phone {
	@ApiProperty()
	code: string;

	@ApiProperty()
	phoneNumber: string;
}
export class AdminUser {
	public id: Types.ObjectId;
	public firstName: string;
	public lastName: string;
	public email: string;
	public password: string;
	public role: string;
}
export class User {
	public id: Types.ObjectId;
	public firstName: string;
	public lastName: string;
	public email: string;
	public password: string;
	public role: string;
	public city: string;
	public address: string;
	public phone: Phone;
	public medicalCode: string;
}

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

	@ApiPropertyOptional()
	city: string;

	@ApiPropertyOptional()
	address: string;

	@ApiPropertyOptional()
	phone: Phone;

	@ApiPropertyOptional()
	medicalCode: string;
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
