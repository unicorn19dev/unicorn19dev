import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String },
  password: String,
  type: { type: String, enum: ['admin', 'doctor', 'client'] },
  city: String,
  address: String,
  phone: {
    code: String,
    phoneNumber: String,
  },
  medicalCode: String,
  tokenResetCode: { type: String, required: false },
});
