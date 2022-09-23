import { ApiProperty } from '@nestjs/swagger';

export class ServiceDTO {
	@ApiProperty()
	name: string;

	@ApiProperty()
	price: number;

	@ApiProperty()
	benefits: string[];

	status: boolean;
}
