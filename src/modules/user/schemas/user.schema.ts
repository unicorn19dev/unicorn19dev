import { Schema } from 'mongoose';

export const UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: { type: String },
	password: String,
	role: { type: String, enum: ['admin', 'doctor', 'insured'] },
	city: String,
	address: String,
	phone: {
		code: String,
		phoneNumber: String,
	},
	medicalCode: String,
});
