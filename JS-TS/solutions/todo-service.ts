import { TodoApi } from './todo-api';
import { Todo, TodoStatus } from './types';

let todoApi = new TodoApi();

export class TodoService {
  constructor(private readonly api: TodoApi) { }

  async create(title: string, description?: string): Promise<Todo> {
    if (!title.trim())
      throw new Error("error create: title isn't settled");
    return this.api.add({title: title.trim(), description});
  }

  async toggleStatus(id: number): Promise<Todo> {
    const todo = (await this.api.getAll()).find(todo => todo.id === id);
    

    if (!todo)
        throw new Error("error toggleStatus: todo is " + todo);

    if (id == null)
      throw new Error("error toggleStatus: id isn't settled");

    const newStatus: TodoStatus = (todo.status >= TodoStatus.COMPLETED)
        ? TodoStatus.PENDING : todo.status + 1;
    
    return this.api.update(id, {status: newStatus});
  }

  async setStatus(id: number, status: TodoStatus): Promise<Todo> {
    if (id == null || !status)
        throw new Error("error setStatus: paameters must be settled");

    return this.api.update(id, {status});
  }

  async search(keyword: string): Promise<Todo[]> {
    keyword = keyword.trim().toLowerCase();
    if (!keyword)
        throw new Error("error search: keyword isn't settled");

    let results = await this.api.getAll();
    return results.filter(elem =>
        elem.title.toLowerCase().includes(keyword) || elem.description?.toLowerCase().includes(keyword)
    );
  }
}