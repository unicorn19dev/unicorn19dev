import { ApiProperty } from '@nestjs/swagger';

export class AppointmentDTO {
	@ApiProperty()
	date: Date;
	@ApiProperty()
	time: Date;
	@ApiProperty()
	city: string;
	@ApiProperty()
	address: string;
	@ApiProperty()
	reference: string;
	@ApiProperty()
	insured: string;
}
