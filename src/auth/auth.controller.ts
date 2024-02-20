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
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '@prisma/client';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login')
  async login(@Body() signInDto: SignInDto): Promise<string> {
    const authToken = await this.authService.login(signInDto);

    if (!authToken) throw new HttpException('Invalid login credentials.', 401);

    return authToken;
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'Created' })
  @Post('register')
  async register(@Body() signUpDto: SignUpDto): Promise<User> {
    return await this.authService.register(signUpDto);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() { user }) {
    return user;
  }
}
