import { Role, Roles } from './../users/roles/roles.decorator';
import { JwtAuthGuard } from './../users/strategies/jwt-auth.guard';
import { createAppointment } from './../../common/_helpers/appoiintment/appointment.validators';
import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/common/_helpers/joi-validation-pipe';
import { messages } from 'src/common/_helpers/messages';
import { AppointmentService } from './appointment.service';
import { AppointmentDTO } from './dto/appointment.dto';

@ApiTags('Citas')
@Controller('appointment')
export class AppointmentController {
	constructor(private appointmentService: AppointmentService) {}

	@UseGuards(JwtAuthGuard)
	@Roles(Role.doctor, Role.insured, Role.admin)
	@Post('')
	async addAppointment(
		@Req() request,
		@Body(new JoiValidationPipe(createAppointment)) service: AppointmentDTO,
	) {
		const data = await this.appointmentService.addAppointment(
			service,
			request.user,
		);

		return {
			message: messages.CREATE_SERVICE,

			data,
		};
	}

	@UseGuards(JwtAuthGuard)
	@Roles(Role.doctor, Role.insured)
	@Get('')
	async getByUser(@Req() request) {
		const data = await this.appointmentService.getAppointmentsByUser(
			request.user,
		);

		return {
			message: messages.APPOINTMENT_LIST,
			data,
		};
	}

	@UseGuards(JwtAuthGuard)
	@Roles(Role.admin)
	@Get('all')
	async getAll(@Req() request) {
		const data = await this.appointmentService.getAppointmentList();

		return {
			message: messages.APPOINTMENT_LIST,
			data,
		};
	}
}
