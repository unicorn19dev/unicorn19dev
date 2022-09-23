import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type UserDocument = User & Document;

export enum roleType {
	doctor = 'doctor',
	insured = 'insured',
}

export enum statusType {
	active = 'active',
	inactive = 'inactive',
}

@Schema()
export class Phone {
	@Prop({ Type: String, required: true })
	code: string;
	@Prop({ Type: String, required: true })
	phoneNumber: string;
}

@Schema({ timestamps: true })
export class User {
	@Prop({ Type: String, required: true })
	email: string;

	@Prop({ Type: String, required: true })
	password: string;

	@Prop({ Type: String, required: true })
	firstName: string;

	@Prop({ Type: String, required: true })
	lastName: string;

	@Prop({ Enum: roleType, required: true })
	role: roleType;

	@Prop({ Enum: statusType, required: true })
	status: statusType;

	@Prop({ Type: String, required: false })
	city: string;

	@Prop({ Type: String, required: false })
	address: string;

	@Prop({ Type: Phone, required: false })
	phone: Phone;

	@Prop({ Type: String, required: false })
	medicalCode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
