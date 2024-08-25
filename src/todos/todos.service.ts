import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from 'src/schemas/todos.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async getTodos(status: string, userId: string): Promise<Todo[]> {
    const matchCondition: {
      userId: string;
      status?: {
        $ne?: string;
        $eq?: string;
      };
    } = {
      userId,
    };

    switch (status) {
      case 'all':
        matchCondition.status = { $ne: 'deleted' };
        break;
      case 'complete':
        matchCondition.status = { $eq: 'complete' };
        break;
      case 'pending':
        matchCondition.status = { $eq: 'pending' };
        break;
      default:
        matchCondition.status = { $ne: 'deleted' };
        break;
    }

    const todos: Todo[] = await this.todoModel.find(matchCondition).select({
      _id: 0,
      id: '$_id',
      title: 1,
      text: 1,
      trashed: 1,
      status: 1,
    });
    return todos || [];
  }

  async getTodo(id: string, userId: string): Promise<Todo | null> {
    const todo: Todo | null = await this.todoModel
      .findOne({
        _id: new Types.ObjectId(id),
        userId: userId,
        trashed: false,
      })
      .select({
        _id: 0,
        id: '$_id',
        title: 1,
        text: 1,
        trashed: 1,
        status: 1,
      });
    return todo;
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = new this.todoModel({
      title: '',
      ...createTodoDto,
      status: 'pending',
    });
    return newTodo.save();
  }

  async deleteTodo(id: string, userId: string) {
    const result = await this.todoModel.deleteOne({
      _id: id,
      userId,
    });
    console.log(result);

    return {
      status: 'Success',
    };
  }

  async deleteCompletedTodos(userId: string): Promise<void> {
    const result = await this.todoModel.deleteMany({
      userId,
      status: 'complete',
    });
    console.log(result);
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
      },
      {
        $set: {
          ...updateTodoDto,
        },
      },
      {
        new: true,
      },
    );

    return todo;
  }
}

// * Nest IoC (inversion of control) design pattern implemented through Dependency Injection (DI) in NestJS. It reverses the control flow of a program, allowing you to decouple dependencies and a more modular and flexible application.
// * Singleton pattern is used in NestJS. When the Nest IoC container instantiates a TodoController, it first looks for any dependencies. When it finds the TodosService dependency, Nest will create the instance of TodosService and cache it. If one instance is already cached, then it returns the existing instance.
