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

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    // Temporary
    const userId: number = 1;

    return this.todoService.create({
      ...createTodoDto,
      user: { connect: { id: userId } },
    });
  }

  @Get()
  findAll() {
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
  findOne(@Param('id') id: string) {
    // Temporary
    const userId: number = 1;

    return this.todoService.findOne({ id: +id, userId });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update({
      where: { id: +id },
      data: updateTodoDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.delete({ id: +id });
  }
}
