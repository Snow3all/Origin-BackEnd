import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { Response } from 'express';
import { Payload } from 'src/decorator/payload.decorator';
import { PayloadDto } from 'src/dto/payload.dto';
import { Public } from 'src/decorator/public.decorator';
import { getProductDto } from './dto/get-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get('/get')
  getProductList(@Res() res: Response) {
    return this.productService.getProductList(res);
  }

  @Public()
  @Post('/getProduct')
  getProduct(@Body() body: getProductDto, @Res() res: Response) {
    return this.productService.getProduct(body, res);
  }

  @Post('/create')
  create(
    @Payload() Payload: PayloadDto,
    @Body() body: CreateProductDto,
    @Res() res: Response,
  ) {
    return this.productService.create(Payload, body, res);
  }

  @Post('/edit')
  edit(
    @Payload() Payload: PayloadDto,
    @Body() body: UpdateProductDto,
    @Res() res: Response,
  ) {
    return this.productService.editProduct(Payload, body, res);
  }

  @Post('/delete')
  deleteProduct(
    @Payload() Payload: PayloadDto,
    @Body() body: DeleteProductDto,
    @Res() res: Response,
  ) {
    return this.productService.deleteProduct(Payload, body, res);
  }
}
