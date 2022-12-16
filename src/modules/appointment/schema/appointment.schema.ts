import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AppointmentDocument = Appointment & Document;

@Schema({ timestamps: true })
export class Appointment {
	@Prop({ Type: Date, required: true })
	date: string;

	@Prop({ Type: String, required: true })
	city: number;

	@Prop({ Type: String, required: true })
	address: string[];

	@Prop({ Type: String, required: true })
	reference: boolean;
}
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
