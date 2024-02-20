import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
  Put,
  HttpException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo as TodoModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ status: 201, description: 'Created' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Req() { user },
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<TodoModel> {
    return this.todosService.create({
      user: { connect: { id: user.userId } },
      ...createTodoDto,
    });
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Req() { user }): Promise<TodoModel[]> {
    return this.todosService.findAll({
      where: {
        userId: user.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Req() { user },
    @Param('id') id: string,
  ): Promise<TodoModel | HttpException> {
    const todo: TodoModel = await this.todosService.findOne({
      id: +id,
      userId: user.userId,
    });

    if (!todo) throw new HttpException('Record not found.', 404);

    return todo;
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Req() { user },
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<TodoModel> {
    return this.todosService.update({
      where: { id: +id, userId: user.userId },
      data: updateTodoDto,
    });
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() { user }, @Param('id') id: string): Promise<TodoModel> {
    return this.todosService.delete({ id: +id, userId: user.userId });
  }
}
