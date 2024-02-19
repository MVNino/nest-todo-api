import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo as TodoModel } from '@prisma/client';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<TodoModel> {
    // Temporary
    const userId: number = 1;

    return this.todoService.create({
      ...createTodoDto,
      user: { connect: { id: userId } },
    });
  }

  @Get()
  findAll(): Promise<TodoModel[]> {
    // Temporary
    const userId: number = 1;

    return this.todoService.findAll({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TodoModel | null> {
    // Temporary
    const userId: number = 1;

    return this.todoService.findOne({ id: +id, userId });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<TodoModel> {
    return this.todoService.update({
      where: { id: +id },
      data: updateTodoDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TodoModel> {
    return this.todoService.delete({ id: +id });
  }
}
