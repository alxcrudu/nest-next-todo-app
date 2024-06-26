import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UsersModule],
  controllers: [TodoController],
  providers: [TodosService],
})
export class TodosModule {}
