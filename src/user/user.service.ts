import { JwtService } from '@nestjs/jwt';
import { User } from './interfaces/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDTO, LoginDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JWTPayload } from './interfaces/jwt';
import { encrypt } from 'src/_helpers/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users') private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(user: RegisterDTO): Promise<string> {
    const userFound = await this.userModel.findOne({ email: user.email });

    if (userFound) {
      return 'Error! Email registrered already';
    }

    user.password = encrypt(user.password);
    const newUser = new this.userModel(user);
    newUser.save();
    return 'User created successfully';
  }

  async login(credentials: LoginDTO): Promise<any> {
    const user: User = await this.userModel.findOne({
      email: credentials.email,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Unregistered user',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const valid = await this.validatePassword(
      credentials.password,
      user.password,
    );
    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Incorrect password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = await this.generateToken(user.id);
    return { user, ...token };
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  getUserById(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  /** UTILS **/
  async generateToken(id: string, time?: string, type = 'mobile') {
    const payload: JWTPayload = { userId: id };

    if (time) {
      if (type == 'web') {
        return {
          token: this.jwtService.sign(payload, { expiresIn: time }),
        };
      } else {
        return {
          token: Math.random().toString(36).substring(2, 6),
        };
      }
    }
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validatePassword(
    password: string,
    passwordReceived: string,
  ): Promise<boolean> {
    return await bcrypt.compareSync(password, passwordReceived);
  }
}
