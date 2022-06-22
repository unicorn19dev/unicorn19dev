import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Users',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService],
})
export class UserModule {}
