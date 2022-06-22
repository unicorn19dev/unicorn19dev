import { User } from './interfaces/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDTO, LoginDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private userModel: Model<User>) {}

  async createUser(user: RegisterDTO): Promise<string> {
    const userFound = await this.userModel.findOne({ email: user.email });

    if (userFound) {
      return 'Error! Email registrered already';
    }
    const salt = bcrypt.genSaltSync(8);
    user.password = bcrypt.hashSync(user.password, salt);
    const newUser = new this.userModel(user);
    newUser.save();
    return 'User created successfully';
  }

  async login(credentials: LoginDTO): Promise<any> {
    const user = await this.userModel.findOne({ email: credentials.email });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Unregistered user',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const valid = await bcrypt.compare(credentials.password, user.password);

    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Incorrect password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  getUser(id) {}
}
