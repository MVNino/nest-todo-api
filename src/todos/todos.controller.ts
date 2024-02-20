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

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

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

  @Delete(':id')
  remove(@Req() { user }, @Param('id') id: string): Promise<TodoModel> {
    return this.todosService.delete({ id: +id, userId: user.userId });
  }
}
