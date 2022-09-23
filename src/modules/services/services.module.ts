import { AdminUsersSchema } from './../users/schemas/adminusers.schema';
import { ServiceSchema } from './schemas/service.schema';

import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServiceService } from './service.service';
import { UserSchema } from '../users/schemas/user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Services',

				schema: ServiceSchema,
			},
			{
				name: 'Users',
				schema: UserSchema,
			},
			{
				name: 'AdminUsers',
				schema: AdminUsersSchema,
			},
		]),
	],

	controllers: [ServicesController],

	providers: [ServiceService],

	exports: [ServiceService],
})
export class ServiceModule {}
