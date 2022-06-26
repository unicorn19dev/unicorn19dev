import { ChangePasswordDTO } from './../dto/user.dto';
import { User, ResetToken } from './../interfaces/user';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from './../user.service';
import { Injectable } from '@nestjs/common';
import { sendEmail, encrypt } from 'src/_helpers/utils';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private userModel: Model<User>,
    @InjectModel('ResetToken') private resetTokenModel: Model<ResetToken>,
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
      const existToken = await this.resetTokenModel.findOne({ email });
      if (existToken) {
        const tokenUpdated = await this.resetTokenModel.findOneAndUpdate(
          { email },
          { token },
          { new: true },
        );
      } else {
        const newToken = new this.resetTokenModel({ token, email });
        newToken.save();
      }

      return await sendEmail(
        user.email,
        'Vetmergencia - Recuperación de contraseña',
        { name: user.firstName + user.lastName, link },
        'views/templates/resetEmail.hbs',
      );
    }
  }

  async resetPassword(
    data: ChangePasswordDTO,
  ): Promise<{ status: boolean; data: any }> {
    try {
      const tokenFound: ResetToken = await this.resetTokenModel.findOne({
        email: data.email,
      });
      if (!tokenFound || tokenFound.token !== data.token) {
        return {
          status: false,
          data: 'Token incorrecto o vencido. Inicia el proceso nuevamente',
        };
      }
      const newPassword = encrypt(data.newPassword);
      await this.userModel.findOneAndUpdate(
        { email: data.email },
        { password: newPassword },
      );
      await this.resetTokenModel.deleteOne({ email: data.email });
      return {
        status: true,
        data: 'Contraseña cambiada exitosamente',
      };
    } catch (err) {
      return {
        status: false,
        data: err,
      };
    }
  }
}
