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
  constructor(private userService: UserService) {}

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
      const user = (await this.userService.login(credentials)) as User;
      return {
        message: `Welcome ${user.firstName} ${user.lastName}`,
        data: user,
      };
    } catch (err) {
      return {
        message: `Error! ${err.response.error}`,
        data: err.response,
      };
    }
  }

  @Post('passwordRecoveryRequest')
  passwordRecoveryRequest(
    @Body() passwordRequest: PasswordRecoveryRequestDTO,
  ): ResponseDTO {
    return {
      message: 'Successfull',
      data: {},
    };
  }

  @Post('changePassword')
  changePassword(@Body() changePassword: ChangePasswordDTO): ResponseDTO {
    return {
      message: 'Successfull',
      data: {},
    };
  }
}
