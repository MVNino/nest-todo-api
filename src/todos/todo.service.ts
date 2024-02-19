import { Injectable } from '@nestjs/common';
import { Todo, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    todoWhereUniqueInput: Prisma.TodoWhereUniqueInput,
  ): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: todoWhereUniqueInput,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
  }): Promise<Todo[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.todo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.TodoWhereUniqueInput;
    data: Prisma.TodoUpdateInput;
  }): Promise<Todo> {
    const { data, where } = params;
    return this.prisma.todo.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    return this.prisma.todo.delete({
      where,
    });
  }
}
