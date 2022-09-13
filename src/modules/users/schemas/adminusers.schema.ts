import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type AdminUsersDocument = AdminUsers & Document;

enum roleType {
	admin = 'admin',
}

enum statusType {
	active = 'active',
	inactive = 'inactive',
}

@Schema({ timestamps: true })
export class AdminUsers {
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
}

export const AdminUsersSchema = SchemaFactory.createForClass(AdminUsers);
