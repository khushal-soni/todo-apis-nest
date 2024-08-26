import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('todos');

    // * In the above example we have set up the LoggerMiddleware for the /todos route handlers that were previously defined inside the TodosController. We may also further restrict a middleware to a particular request method by passing an object containing the route path and request method to the forRoutes() method when configuring the middleware
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'todos*',
      method: RequestMethod.GET,
    });
  }
}

// * A Module is a class annotated with a @module decorator. The @Module decorator provides metadata that Nest makes use of to organize the application structure.

// * Each Application has at least one module, a root module. The root module is the starting point Nest uses to build the application graph - the internal data structure Nest uses to resolve module and provider relationships and dependencies. While very small applications may theoretically have just the root module, this is not the typical case. We want to emphasize that modules are strongly recommended as an effective way to organize your components. Thus, for most applications, the resulting architecture will employ multiple modules, each encapsulating a closely related set of capabilities.

// * So modules consists of imports, providers, controllers and exports
// * The Modules are added in the imports array
// * the services, util classes etc are added inside the providers array and the controllers inside the controllers array

// * In Nest, modules are singletons by default, and thus you can share the same instance of any provider between multiple modules effortlessly.
// * Every module is automatically a shared module. Once created it can be reused by any module. Refer to todos.module for more info about exports and shared modules.

// * There is no place for middleware in the @Module decorator. Instead, we set them up using the configure() method of the module class. Modules that include middleware have to implement the NestModule interface. Let's set up the LoggerMiddleware at the AppModule Level

// * Pattern based Routes are supported as well in forRoutes() method. For instance, the asterisk is used as a wildcard, and will match any combination of characters.

// * For configuration like .env files, we have to install @nestjs/config package which internally uses dotenv package and provides a ConfigModule which can be imported in the AppModule.
