import { User } from './../interfaces/user';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from './../user.service';
import { Injectable } from '@nestjs/common';
import { sendEmail } from 'src/_helpers/utils';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private userModel: Model<User>,
    private readonly userService: UserService,
  ) {}

  async forgotPassword(email: string): Promise<{ status: boolean; data: any }> {
    const user: User = await this.userModel.findOne({ email });
    if (user) {
      const { token } = await this.userService.generateToken(
        user.email,
        '3600',
      );
      const clientURL = process.env.URL;
      const link = `${clientURL}/passwordReset?token=${token}&id=${user._id}`;

      return await sendEmail(
        user.email,
        'Vetmergencia - Recuperación de contraseña',
        { name: user.firstName + user.lastName, link },
        'views/templates/resetEmail.hbs',
      );
    }
  }
}
