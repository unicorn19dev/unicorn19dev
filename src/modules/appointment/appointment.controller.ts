import { Body, Controller, Post, Get } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { JoiValidationPipe } from 'src/common/_helpers/joi-validation-pipe';

import { createService } from 'src/common/_helpers/services/service.validators';

import { messages } from 'src/common/_helpers/messages';

import { AppointmentService } from './appointment.service';

import { AppointmentDTO } from './dto/appointment.dto';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentController {
	constructor(private appointmentService: AppointmentService) {}

	@Post('')
	async addAppointment(
		@Body(new JoiValidationPipe(createService)) service: AppointmentDTO,
	) {
		const data = await this.appointmentService.addAppointment(service);

		return {
			message: messages.CREATE_SERVICE,

			data,
		};
	}

	@Get('')
	async getAll() {
		const data = await this.appointmentService.getAppointmentsByUser();

		return {
			message: messages.CREATE_SERVICE,

			data,
		};
	}
}
