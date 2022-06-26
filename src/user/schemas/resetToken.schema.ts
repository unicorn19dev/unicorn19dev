import { Schema } from 'mongoose';

export const ResetTokenSchema = new Schema({
  createdAt: {
    default: Date.now,
    expires: 3600,
    type: Date,
  },
  token: { type: String, required: true },
  email: { type: String, required: true },
});
