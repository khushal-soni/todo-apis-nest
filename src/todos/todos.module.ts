import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from 'src/schemas/todos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
    ]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService], // So that this can be reused in another module
})
export class TodosModule {
  constructor() {}
}

// * Let's imagine that we want to share an instance of the TodosService between several other modules. In order to do that, we first need to export the TodosService provider by adding it to the module's exports array.

// * A module class can inject providers as well (e.g., for configuration purposes).
// * However, module classes themselves cannot be injected as providers due to circular dependency.
