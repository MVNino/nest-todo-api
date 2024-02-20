import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { PrismaService } from 'src/prisma.service';
import { TodosService } from './todos.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  controllers: [TodosController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    TodosService,
    PrismaService,
  ],
  exports: [TodosService],
})
export class TodosModule {}
