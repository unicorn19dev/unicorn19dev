import { AuthService } from './auth.service';
import { User } from './../interfaces/user';
import {
  registerValidation,
  loginValidation,
} from './../../_helpers/users/user.validators';
import { UserService } from './../user.service';
import { Body, Controller, Post } from '@nestjs/common';

import { ResponseDTO } from 'src/_DTO/response.dto';
import { JoiValidationPipe } from '../../_helpers/joi-validation-pipe';
import {
  RegisterDTO,
  LoginDTO,
  PasswordRecoveryRequestDTO,
  ChangePasswordDTO,
} from '../dto/user.dto';
@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async createUser(
    @Body(new JoiValidationPipe(registerValidation)) user: RegisterDTO,
  ): Promise<ResponseDTO> {
    const message = await this.userService.createUser(user);
    return {
      message: message,
      data: {},
    };
  }

  @Post('login')
  async login(
    @Body(new JoiValidationPipe(loginValidation)) credentials: LoginDTO,
  ): Promise<ResponseDTO> {
    try {
      const session = await this.userService.login(credentials);
      return {
        message: `Welcome ${session.user.firstName} ${session.user.lastName}`,
        data: session,
      };
    } catch (err) {
      return {
        message: `Error! ${err.response.error}`,
        data: err.response,
      };
    }
  }

  @Post('passwordRecoveryRequest')
  async passwordRecoveryRequest(
    @Body() passwordRequest: PasswordRecoveryRequestDTO,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.authService.forgotPassword(
        passwordRequest.email,
      );
      return {
        message: 'Email enviado',
        data: response,
      };
    } catch (err) {
      return {
        message: 'Error',
        data: err,
      };
    }
  }

  @Post('resetPassword')
  async resetPassword(
    @Body() changePassword: ChangePasswordDTO,
  ): Promise<ResponseDTO> {
    const result = await this.authService.resetPassword(changePassword);
    console.log(result, 'RESULT');
    if (!result.status) {
      return {
        message: 'Error!',
        data: result.data,
      };
    }
    return {
      message: 'Successful!',
      data: result.data,
    };
  }
}
