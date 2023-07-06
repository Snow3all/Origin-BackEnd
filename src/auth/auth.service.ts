import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model, Types } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import { User, UsersDocument } from 'src/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
    private jwtService: JwtService,
  ) {}

  async login(body: AuthDto, res: Response) {
    try {
      const { username, password } = body;
      const getUser = await this.userModel.findOne({
        username: username.toLowerCase(),
      });
      const comparesPassword = await compare(password, getUser.password);
      if (comparesPassword) {
        const token = this.jwtService.sign({
          _id: getUser._id,
          username: getUser.username,
          role: getUser.role,
        });
        return res.status(200).json({
          status: 0,
          token: token,
          username: getUser.username,
          role: getUser.role,
          message: 'Success',
        });
      } else {
        return res.status(200).json({
          status: 113,
          message: 'Password does not match',
        });
      }
    } catch (e) {
      return res.status(500).json({
        message: e,
      });
    }
  }

  async register(body: AuthDto, res: Response) {
    try {
      const { username, password } = body;
      if (username && password) {
        const user = new this.userModel({
          username: username.toLowerCase().trim(),
          password: await hash(password, 10),
        });
        await user.save();
        return res.status(200).json({
          status: 0,
          message: 'Done Registering',
        });
      } else {
        return res.status(200).json({
          status: 112,
          message: 'Please fill all in the required fields',
        });
      }
    } catch (e) {
      return res.status(500).json({
        message: e,
      });
    }
  }
}
