import { adminRoleType } from './../users/schemas/adminusers.schema';
import { JwtPayload } from './../users/roles/roles.guard';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { AppointmentDTO } from './dto/appointment.dto';

import { Appointment } from './schema/appointment.schema';
import { roleType } from '../users/schemas/user.schema';

@Injectable()
export class AppointmentService {
	constructor(
		@InjectModel('Appointment')
		private appointmentSchema: Model<AppointmentDTO>,
		@InjectModel('Suscription')
		private suscriptionSchema: Model<AppointmentDTO>,
	) {}

	async addAppointment(appointment: AppointmentDTO, user: JwtPayload) {
		const appointmentList = await this.appointmentSchema.find({
			date: appointment.date,
		});
		//
		// validar suscription
		//
		let insured = null;
		if (user.role === roleType.insured) {
			insured = user.id;
		} else if (
			user.role === roleType.doctor ||
			user.role === adminRoleType.admin
		) {
			insured = appointment.insured;
		}

		const newService = new this.appointmentSchema({
			...appointment,
			insured,
		});

		newService.save();
		return newService;
	}

	async getAppointmentsByUser(user: JwtPayload) {
		const query = {};
		if (user.role === roleType.doctor) {
			query['doctor'] = user.id;
		}
		if (user.role === roleType.doctor) {
			query['insured'] = user.id;
		}
		const allServices = await this.appointmentSchema.find(query);

		const beforeToday = allServices.filter(
			(e) =>
				new Date(e.date).toISOString().split('T')[0] <
				new Date().toISOString().split('T')[0],
		);

		const today = allServices.filter(
			(e) =>
				new Date(e.date).toISOString().split('T')[0] >=
				new Date().toISOString().split('T')[0],
		);

		return {
			today,
			historical: beforeToday,
		};
	}

	async getAppointmentList() {
		const appointmentList = await this.appointmentSchema.find();
		return appointmentList;
	}
}
