import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserModel> {
    return this.userService.findOne({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.update({
      where: { id: +id },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserModel> {
    return this.userService.delete({ id: +id });
  }
}
