import { Module } from '@nestjs/common';
import { TodosService } from './todo.service';
import { TodosController } from './todos.controller';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
