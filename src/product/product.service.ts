import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { getProductDto } from './dto/get-product.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from 'src/schema/product.schema';
import { PayloadDto } from 'src/dto/payload.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getProductList(res: Response) {
    try {
      const productList = await this.productModel.find();
      return res.status(200).json({
        status: 0,
        data: productList,
        message: 'Done',
      });
    } catch (err) {
      return res.status(500).json({
        status: 999,
        message: err,
      });
    }
  }

  async getProduct(body: getProductDto, res: Response) {
    try {
      const { id } = body;
      const getProduct = await this.productModel.findOne({
        _id: new Types.ObjectId(id),
      });
      return res.status(200).json({
        status: 0,
        data: getProduct,
        message: 'Done',
      });
    } catch (err) {
      return res.status(500).json({
        status: 999,
        message: err,
      });
    }
  }

  async create(payload: PayloadDto, body: CreateProductDto, res: Response) {
    try {
      if (payload.role.includes('ADMIN')) {
        const newProduct = new this.productModel({
          ...body,
        });
        await newProduct.save();
        return res.status(200).json({
          status: 0,
          message: 'Done Create Product',
        });
      } else {
        return res.status(200).json({
          status: 401,
          message: 'Unauthorized',
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 999,
        message: err,
      });
    }
  }

  async editProduct(
    payload: PayloadDto,
    body: UpdateProductDto,
    res: Response,
  ) {
    try {
      if (payload.role.includes('ADMIN')) {
        const { id, banner, description, name, price, stock } = body;
        await this.productModel.updateOne(
          { _id: new Types.ObjectId(id) },
          {
            banner: banner,
            description: description,
            name: name,
            price: price,
            stock: stock,
          },
        );
        return res.status(200).json({
          status: 0,
          message: 'Done Update Product',
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 999,
        message: err,
      });
    }
  }

  async deleteProduct(
    payload: PayloadDto,
    body: DeleteProductDto,
    res: Response,
  ) {
    try {
      if (payload.role.includes('ADMIN')) {
        const { id } = body;
        await this.productModel.findOneAndDelete({
          _id: new Types.ObjectId(id),
        });
        res.status(200).json({
          status: 0,
          message: `Delete Product Success ID: ${id}`,
        });
      } else {
        return res.status(200).json({
          status: 401,
          message: 'Unauthorized',
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 999,
        message: err,
      });
    }
  }
}
