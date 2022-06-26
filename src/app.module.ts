import { ResetTokenSchema } from './user/schemas/resetToken.schema';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './user/auth/auth.controller';
import { UserController } from './user/user.controller';
import { AuthService } from './user/auth/auth.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './user/schemas/user.schema';
import { SuscriptionsController } from './suscriptions/suscriptions.controller';
import { MedicalHistoryController } from './medical-history/medical-history.controller';
import { ServicesController } from './services/services.controller';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://localhost:27017/vetmergencia`),
    MongooseModule.forFeature([
      {
        name: 'Users',
        schema: UserSchema,
      },
      {
        name: 'ResetToken',
        schema: ResetTokenSchema,
      },
    ]),
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
  ],
  controllers: [
    AppController,
    UserController,
    SuscriptionsController,
    MedicalHistoryController,
    ServicesController,
  ],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {}
