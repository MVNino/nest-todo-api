import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  HttpException,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    const authToken = await this.authService.login(signInDto);

    if (!authToken) throw new HttpException('Invalid login credentials.', 401);

    return authToken;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() { user }) {
    return user;
  }
}
