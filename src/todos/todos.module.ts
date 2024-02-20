import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { PrismaService } from 'src/prisma.service';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService, PrismaService],
  exports: [TodosService],
})
export class TodosModule {}
