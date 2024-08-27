import {
  // ParseIntPipe,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { Todo } from 'src/schemas/todos.schema';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

enum TodoStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ALL = 'all',
}

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @ApiOperation({
    summary: 'Create a to-do for a user',
  })
  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.createTodo(createTodoDto);
  }

  @ApiOperation({
    summary: 'Get all to-dos of a user',
  })
  @ApiQuery({
    name: 'status',
    description: 'Filter to-dos by their status',
    enum: TodoStatus,
    enumName: 'TodoStatus',
    example: TodoStatus.ALL,
  })
  @ApiQuery({
    name: 'userId',
    description: 'ID of the user whose to-dos are being fetched',
    example: 'random_user_id_98765543211',
  })
  @Get()
  async getTodos(
    @Query('status') status: string,
    @Query('userId') userId: string,
  ): Promise<Todo[] | []> {
    return this.todoService.getTodos(status, userId);
  }

  @ApiOperation({
    summary: 'Get a to-do by ID',
  })
  @ApiQuery({
    name: 'id',
    description:
      'ID of the to-do being fetched. You can find this id from the get all todos api',
    example: '66ccc70ea2c6ae360479ae00',
  })
  @ApiQuery({
    name: 'userId',
    description: 'ID of the user whose to-dos are being fetched',
    example: 'random_user_id_98765543211',
  })
  @Get(':id')
  // async getTodo(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
  async getTodo(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<Todo> {
    return this.todoService.getTodo(id, userId);
  }

  @ApiOperation({
    summary: 'Delete all to-dos marked as completed',
  })
  @Delete('complete')
  async deleteCompletedTodos(@Query('userId') userId: string): Promise<void> {
    const result = await this.todoService.deleteCompletedTodos(userId);
    console.log(result);
  }

  @ApiOperation({
    summary: 'Delete a to-do by ID',
  })
  @Delete(':id')
  async deleteTodo(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<void> {
    this.todoService.deleteTodo(id, userId);
  }

  @ApiOperation({
    summary: 'Update a to-do by ID',
  })
  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const updateResult = await this.todoService.updateTodo(id, updateTodoDto);

    return updateResult;
  }
}

// * In the following example, we'll use @Controller decorator, which is required to define a basic controller. We'll specify an optional route path prefix of 'todos'. Using a path prefix in a @Controller() decorator allows us to easily group a set of related routes, and minimize repetitive code. For example, we may choose to group a set of routes that manage interactions with a cat entity under the route /todos. In that case, we could specify the path prefix todos in the @Controller() decorator so that we don't have to repeat that portion of the path for each route in the file.

// * By default, the response's status code is always 200 by default, except for POST requests which use 201. We can easily change this behavoir by adding the @HttpCode() decorator at a handler-level.
