import { SuscriptionSchema } from './../suscriptions/schemas/suscriptions.schema';
import { MongooseModule } from '@nestjs/mongoose';

import { Module } from '@nestjs/common';

import { UserSchema } from '../users/schemas/user.schema';

import { AppointmentSchema } from './schema/appointment.schema';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { UserModule } from '../users/user.module';
import { SuscriptionsModule } from '../suscriptions/suscriptions.module';

@Module({
	imports: [
		UserModule,
		SuscriptionsModule,
		MongooseModule.forFeature([
			{
				name: 'Appointment',
				schema: AppointmentSchema,
			},

			{
				name: 'Users',
				schema: UserSchema,
			},
			{
				name: 'Suscription',
				schema: SuscriptionSchema,
			},
		]),
	],

	controllers: [AppointmentController],

	providers: [AppointmentService],

	exports: [AppointmentService],
})
export class AppointmentModule {}
