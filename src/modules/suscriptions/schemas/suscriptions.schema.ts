import { User } from './../../users/dto/user.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type SuscriptionDocument = Suscription & Document;

@Schema({ timestamps: true })
export class Suscription {
	@Prop({ Type: Date, required: true })
	expirationDate: Date;

	@Prop({ Type: User, required: true })
	user: User;
}
export const SuscriptionSchema = SchemaFactory.createForClass(Suscription);
