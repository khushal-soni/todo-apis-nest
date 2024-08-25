## Description

This project is a backend API for a To-Do client application, built using the [NestJS](https://nestjs.com/) framework. It provides a robust and scalable RESTful API for managing to-do items, including functionalities for creating, retrieving, updating, and deleting tasks.

## Features

- **Task Management**: Create, update, delete, and retrieve tasks.
- **Task Filtering**: Filter tasks by status and user.
- **Task Toggling**: Update the status of tasks to mark them as completed, pending, or delete them.
- **Bulk Deletion**: Delete completed tasks in bulk.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Configure Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
PORT=3000
```

## API Endpoints

### Create a Task

- **Endpoint**: `POST /todos`
- **Description**: Create a new to-do item.
- **Request Body**: `CreateTodoDto` (e.g., `{ title: string, description: string, status: string, userId: string }`)
- **Response**: `Todo` object

### Retrieve All Tasks

- **Endpoint**: `GET /todos`
- **Description**: Retrieve a list of all to-do items, optionally filtered by status and user.
- **Query Parameters**:
  - `status` (optional): Filter tasks by status.
  - `userId` (optional): Filter tasks by user.
- **Response**: Array of `Todo` objects

### Retrieve a Single Task

- **Endpoint**: `GET /todos/:id`
- **Description**: Retrieve a specific to-do item by ID.
- **Path Parameters**:
  - `id`: ID of the task to retrieve.
- **Query Parameters**:
  - `userId` (optional): Specify the user ID to filter.
- **Response**: `Todo` object

### Delete Completed Tasks

- **Endpoint**: `DELETE /todos/complete`
- **Description**: Delete all completed tasks for a specific user.
- **Query Parameters**:
  - `userId`: ID of the user whose completed tasks are to be deleted.
- **Response**: No content (void)

### Delete a Task

- **Endpoint**: `DELETE /todos/:id`
- **Description**: Delete a specific to-do item by ID.
- **Path Parameters**:
  - `id`: ID of the task to delete.
- **Query Parameters**:
  - `userId` (optional): Specify the user ID to filter.
- **Response**: No content (void)

### Update a Task

- **Endpoint**: `PATCH /todos/:id`
- **Description**: Update a specific to-do item by ID.
- **Path Parameters**:
  - `id`: ID of the task to update.
- **Request Body**: `UpdateTodoDto` (e.g., `{ title?: string, description?: string, status?: string }`)
- **Response**: Updated `Todo` object

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.