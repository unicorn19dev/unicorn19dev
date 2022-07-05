import { Document } from 'mongoose';

export interface User extends Document {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResetToken extends Document {
  token: string;
  email: any;
}
