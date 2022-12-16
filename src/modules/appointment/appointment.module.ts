import { MongooseModule } from '@nestjs/mongoose';

import { Module } from '@nestjs/common';

import { UserSchema } from '../users/schemas/user.schema';

import { AppointmentSchema } from './schema/appointment.schema';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Appointments',

				schema: AppointmentSchema,
			},

			{
				name: 'Users',

				schema: UserSchema,
			},
		]),
	],

	controllers: [AppointmentController],

	providers: [AppointmentService],

	exports: [AppointmentService],
})
export class ServiceModule {}
