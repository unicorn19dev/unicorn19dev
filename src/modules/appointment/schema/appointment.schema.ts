import { User } from './../../users/dto/user.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type AppointmentDocument = Appointment & Document;
enum appointmentStatus {
	requested = 'requested',
	done = 'done',
	cancelled = 'cancelled',
}
@Schema({ timestamps: true })
export class Appointment {
	@Prop({ Type: Date, required: true })
	date: Date;

	@Prop({ Type: Date, required: true })
	time: Date;

	@Prop({ Type: String, required: true })
	city: string;

	@Prop({ Type: String, required: true })
	address: string;

	@Prop({ Type: String, required: true })
	reference: string;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Users',
	})
	insured: User;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		ref: 'Users',
	})
	doctor: User;

	@Prop({
		enum: appointmentStatus,
		required: true,
		default: appointmentStatus.requested,
	})
	status: appointmentStatus;
}
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
