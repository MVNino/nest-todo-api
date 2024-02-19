import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { RequestLimitMiddleware } from './middlewares/request-limiter.middleware';

@Module({
  imports: [TodosModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLimitMiddleware).forRoutes('*');
  }
}
