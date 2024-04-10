import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('todos')
@ApiTags('Todos')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @Request() req: any,
  ) {
    return this.todosService.create(createTodoDto, req);
  }

  @Get()
  getAll(@Request() req: any) {
    return this.todosService.getAll(req);
  }

  @Patch(':id')
  update(@Param('id') id: number) {
    return this.todosService.update(Number(id));
  }

  @Patch('/edit/:id')
  editTodo(@Param('id') id: number, @Request() req: any) {
    return this.todosService.editTodo(Number(id), req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(Number(id));
  }
}
