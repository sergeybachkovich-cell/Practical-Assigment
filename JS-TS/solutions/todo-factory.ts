import { Todo, NewTodo, TodoStatus } from './types';

let nextId = 1;

// 1. In solutions/todo-factory.ts implement createTodo(input: NewTodo): Todo.
export function createTodo(input: NewTodo): Todo {
    
    // 2. the funcion must
    return {
        id: nextId++, // 2.1. generate a unique incremental id (start with 1)
        title: input.title,
        description: input.description,
        status: TodoStatus.PENDING, // 2.3. default the status field to TodoStatus.PENDING
        createdAt:  new Date(), // 2.2. set createdAt to the current time
    }

}