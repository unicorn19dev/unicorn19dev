import { UserSchema } from './../user/schemas/user.schema';
import { VersionDBSchema } from './schemas/versionDB.schema';
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserModule } from '../user/user.module';
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
