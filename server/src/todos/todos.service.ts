import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
    private usersService: UsersService,
  ) {}

  async create(createTodoDto: CreateTodoDto, req: any) {
    const userId = req.user.userId;

    const todo: Todo = new Todo();
    todo.todo = createTodoDto.todo;
    todo.completed = false;
    todo.user = await this.usersService.findUserById(userId);
    this.todoRepo.save(todo);
    return `Succesfully created todo with id: ${todo.id}`;
  }

  getAll(req: any) {
    const userId = req.user.userId;

    return this.todoRepo.find({
      relations: ['user'],
      where: { user: { id: userId } },
    });
  }

  update(todoId: number) {
    return this.todoRepo.update(todoId, { completed: true });
  }

  editTodo(todoId: number, req: any) {
    const newTodo = req.body.todo;
    return this.todoRepo.update(todoId, { todo: newTodo });
  }

  remove(todoId: number) {
    return this.todoRepo.delete(todoId);
  }
}
