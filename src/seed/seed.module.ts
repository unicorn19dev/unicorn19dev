import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';

import { SeedController } from './seed.controller';

import { UserModule } from '../user/user.module';
import { VersionDBSchema } from 'src/seed/schemas/versionDB.schema';
import { UserSchema } from 'src/user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Users',

				schema: UserSchema,
			},
			{
				name: 'VersionDB',
				schema: VersionDBSchema,
			},
		]),
		UserModule,
	],

	controllers: [SeedController],

	providers: [SeedService],
})
export class SeedModule {}
