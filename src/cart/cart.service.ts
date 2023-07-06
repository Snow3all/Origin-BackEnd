import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UsersDocument } from 'src/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from 'src/dto/payload.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
    private jwtService: JwtService,
  ) {}
  async updateCart(payload: PayloadDto, body: any, res: Response) {
    try {
      const { cart } = body;
      const test = await this.userModel.findOneAndUpdate(
        { _id: new Types.ObjectId(payload._id) },
        { cart: cart },
        { new: true },
      );
      return res.status(200).json({
        status: 0,
        message: 'Success',
      });
    } catch (err) {
      return res.status(500).json({
        status: 999,
        message: err,
      });
    }
  }

  async getCart(payload: PayloadDto, body: any, res: Response) {
    try {
      const getCart = await this.userModel
        .findOne({ _id: new Types.ObjectId(payload._id) })
        .select('cart')
        .populate('cart.productId');
      return res.status(200).json({
        status: 0,
        data: getCart,
        message: 'Success',
      });
    } catch (err) {
      return res.status(500).json({
        status: 999,
        message: err,
      });
    }
  }
}
