import { MigrationService } from './migration.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { VersionDBSchema } from './schemas/versionDB.schema';
import { AdminUsersSchema } from '../../modules/users/schemas/adminusers.schema';
dotenv.config({ path: resolve(__dirname, '../../../.env') });
@Module({
	imports: [
		MongooseModule.forRoot(
			process.env.DB_PLATFORM +
				'://' +
				process.env.DB_SERVER +
				':' +
				process.env.DB_PORT +
				'/' +
				process.env.DB_DATABASE,
		),
		MongooseModule.forFeature([
			{
				name: 'AdminUsers',
				schema: AdminUsersSchema,
			},
			{
				name: 'VersionDB',
				schema: VersionDBSchema,
			},
		]),
	],
	controllers: [],
	providers: [MigrationService],
})
export class MigrationModule {}
