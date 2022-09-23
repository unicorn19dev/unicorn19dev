import { ApiProperty } from '@nestjs/swagger';

export class CreateSuscriptionDto {
	@ApiProperty()
	name: string;
}

