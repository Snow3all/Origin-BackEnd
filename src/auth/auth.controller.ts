import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from 'src/decorator/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  login(@Body() body: AuthDto, @Res() res: Response) {
    return this.authService.login(body, res);
  }

  @Public()
  @Post('/register')
  register(@Body() body: AuthDto, @Res() res: Response) {
    return this.authService.register(body, res);
  }
}
