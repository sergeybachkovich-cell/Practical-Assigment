import { TodoApi } from "../JS-TS/solutions/todo-api";
import { TodoService } from "../JS-TS/solutions/todo-service";
/*
Requirements:
    [+] 1.Jest and ts-jest are already configured — study jest.config.js before you start. Note that no ready-made test file exists for this task: unlike tasks 1-8 and 10, you write the tests yourself.
    [-] 2.Create tests/js-ts-task-09.test.ts and cover at minimum:
        [+]-successful creation of a todo
        []-toggling status
        []-search returns matching items
        []-error is thrown when setStatus is called with a non-existing id
    [] 3.Mock the network latency (setTimeout) to keep tests fast.
    [] 4.Achieve at least 90 % line coverage for todo-service.ts and repository.ts: npx jest --coverage --testPathPatterns=js-ts-task-09.

*/

/*  templates that i've find:

// GENERAL:
describe('typeOfExpectMethods', () => {
  it('description2', () => {
    // process for a testing
    const temporary = someth;

    expect(temporary).toHaveProperty('propName');
    expect(temporary).toEqual([a, b])
    expect(temporary).toBe(a);
    expect(reverted.every((t) => t.status === TodoStatus.PENDING)).toBe(true);
    expect(() => partition(undefined as unknown as number[], (n) => n > 0)).toThrow(TypeError);
    expect(() => updateTodo(list, -1, { status: TodoStatus.COMPLETED })).toThrow();
    expect(base).toHaveLength(0);
  });
});

// PROMISES:
describe('promiseTesting', () => {
jest.setTimeout(10000);
  let api: TodoApi;

  beforeEach(() => {
    api = new TodoApi();
  });

  it('remove should throw TodoNotFoundError for a non-existing id', async () => {
    await expect(api.remove(-1)).rejects.toMatchObject({ name: 'TodoNotFoundError' });
  });

  it('each method should simulate 300-600 ms of latency', async () => {
    jest.useFakeTimers();
    const spy = jest.spyOn(global, 'setTimeout');
    const pending = api.getAll();
    await jest.runAllTimersAsync();
    await pending;
    const delays = spy.mock.calls.map((call) => call[1]);
    expect(delays.length).toBeGreaterThan(0);
    delays.forEach((ms) => {
      expect(ms).toBeGreaterThanOrEqual(300);
      expect(ms).toBeLessThanOrEqual(600);
    });
    jest.useRealTimers();
  });
});

// CLASSES
describe('Task 07: Generic Repository', () => {
  interface Entity { id: number; value: string; }
  let repo: InMemoryRepository<Entity>;

  beforeEach(() => {
    repo = new InMemoryRepository<Entity>();
    repo.add({ id: 1, value: 'A' });
    repo.add({ id: 2, value: 'B' });
  });

  it('remove should delete entity', () => {
    repo.remove(2);
    expect(repo.findById(2)).toBeUndefined();
  });
});
*/

describe('Task 9: Write Unit Tests for Business Logic', () => {
  jest.setTimeout(10000);
  let todoService: TodoService;

  beforeEach(() => {
    todoService = new TodoService(new TodoApi());
  });

  // 2.1
  it('successful creation of a todo', async () => {
    const todo = await todoService.create("title", "description");
    await expect(todo).toMatchObject({
      title: "title",
      description: "description"
    });
  });

   it('throwing error to creation of an empty todo', async () => {
    await expect(todoService.create("", "")).rejects.toThrow(
      "error create: title isn't settled"
    );
  });

  // 2.2
  it('toggling status', async () => {
    if (!
  });

  // 2.3
  it('search returns matching items', async () => {

  });

  // 2.4
  it('error is thrown when setStatus is called with a non-existing id', async () => {

    jest.useRealTimers();
  });
});



