import { User } from './../../users/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSuscriptionDto {
	@ApiProperty()
	expirationDate: Date;

	@ApiProperty()
	user: User;
}
