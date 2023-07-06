import { Controller, Res, Post, Body, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { Response } from 'express';
import { PayloadDto } from 'src/dto/payload.dto';
import { Payload } from 'src/decorator/payload.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/update')
  update(
    @Payload() payload: PayloadDto,
    @Body() body: any,
    @Res() res: Response,
  ) {
    return this.cartService.updateCart(payload, body, res);
  }

  @Get('/get')
  getCart(
    @Payload() payload: PayloadDto,
    @Body() body: any,
    @Res() res: Response,
  ) {
    return this.cartService.getCart(payload, body, res);
  }
}
