import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServicesDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
	@Prop({ Type: String, required: true })
	name: string;

	@Prop({ Type: Number, required: true })
	price: number;

	@Prop({ Type: Array, required: true })
	benefits: string[];

	@Prop({ Type: Boolean, required: true })
	status: boolean;
}
export const ServiceSchema = SchemaFactory.createForClass(Service);
