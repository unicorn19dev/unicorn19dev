import { Schema } from 'mongoose';

export const VersionDBSchema = new Schema(
	{
		version: String,
	},
	{ timestamps: true },
);
