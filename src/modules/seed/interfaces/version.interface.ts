import { Document } from 'mongoose';

export interface VersionDB extends Document {
	version: string;
}
