import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { AppointmentDTO } from './dto/appointment.dto';

import { Appointment } from './schema/appointment.schema';

@Injectable()
export class AppointmentService {
	constructor(
		@InjectModel('Appoinments') private appointment: Model<Appointment>,
	) {}

	addAppointment(appointment: AppointmentDTO) {
		const newService = new this.appointment({
			...appointment,

			status: true,
		});

		newService.save();

		return newService;
	}

	async getAppointmentsByUser() {
		const allServices = await this.appointment.find();

		return allServices;
	}
}
