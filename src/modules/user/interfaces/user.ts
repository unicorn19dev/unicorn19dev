import { Document } from 'mongoose';

export interface User extends Document {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	password: string;
	token: string;
}

export interface ResetToken extends Document {
	token: string;
	email: any;
}
