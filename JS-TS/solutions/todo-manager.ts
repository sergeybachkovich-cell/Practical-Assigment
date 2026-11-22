import { TodoService } from './todo-service';
import { TodoApi } from './todo-api';
import { InMemoryRepository } from './repository';
import { Todo, TodoStatus } from './types';

export class ToDoManager {
  private repo = new InMemoryRepository<Todo>();
  private api = new TodoApi(this.repo);
  private service = new TodoService(this.api);

  // seed with demo data
  async init(): Promise<void> {
    await this.service.create('First', 'FirstTodo');
  }

  async add(title: string, description?: string): Promise<void> {
    await this.service.create(title, description);
  }

  async complete(id: number): Promise<void> {
    if (id == null)
        throw new Error('complete: id is undefined!');
    await this.service.setStatus(id, TodoStatus.COMPLETED);
  }

  async list(): Promise<Todo[]> {
    return this.api.getAll();
  }
}
