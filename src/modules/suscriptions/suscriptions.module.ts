import { UserSchema } from './../users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';
import { SuscriptionsController } from './suscriptions.controller';
import { SuscriptionSchema } from './schemas/suscriptions.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Suscriptions',
				schema: SuscriptionSchema,
			},

			{
				name: 'Users',
				schema: UserSchema,
			},
		]),
	],
	controllers: [SuscriptionsController],
	providers: [SuscriptionsService],
})
export class SuscriptionsModule {}
