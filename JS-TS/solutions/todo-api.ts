import { Todo, NewTodo } from './types';
import { updateTodo, addTodo, removeTodo } from './todo-crud';
import { createTodo } from './todo-factory';
import { rejects } from 'assert';
import { InMemoryRepository } from './repository';

export class TodoNotFoundError extends Error {
    readonly id: number;
    
    constructor(id: number) {
        super(`Todo with ID ${id} not found`);

        this.name = 'TodoNotFoundError'
        this.id = id;
    }
}

const randomDelayMs = (min: number = 300, max: number = 600): number => 
    Math.floor(Math.random() * (max - min)) + min;

export class TodoApi {
  // Task 6 stores todos in a plain array; Task 7 replaces it with InMemoryRepository
  //   private todos: Todo[] = [];

  constructor(private readonly repo = new InMemoryRepository<Todo>()) {};
  

  async getAll(): Promise<Todo[]> {
    await new Promise(resolve => setTimeout(resolve, randomDelayMs()));
    // return this.todos;
    return [...this.repo.findAll()];
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await new Promise<void>(resolve => setTimeout(resolve, randomDelayMs()));

    const todo = createTodo(newTodo);
    // this.todos.push(todo);
    this.repo.add(todo);

    return todo;
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    await new Promise(resolve => setTimeout(resolve, randomDelayMs()));

    // const todo = this.todos.find(elem => elem.id === id);
    const todo = this.repo.findById(id);

    if (!todo) {
        throw new TodoNotFoundError(id);
    }

    // Object.assign(todo, update);

    const updatedTodo = this.repo.update(id, update);

    return {...updatedTodo};

  }

  async remove(id: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, randomDelayMs()));

    // const idx = this.todos.findIndex(elem => elem.id === id);
    const todo = this.repo.findById(id);
    // if (idx === -1)
    if (!todo)
        throw new TodoNotFoundError(id);

    // this.todos.splice(idx, 1);
    this.repo.remove(id);
  }
}