import { TodoService } from "../JS-TS/solutions/todo-service";
import { TodoApi } from "../JS-TS/solutions/todo-api";
import { InMemoryRepository } from "../JS-TS/solutions/repository";
import { Todo, TodoStatus } from "../JS-TS/solutions/types";
import { TodoNotFoundError } from "../JS-TS/solutions/todo-api";

describe('Task 9: TodoService and InMemoryRepository Unit Tests', () => {
    let repo: InMemoryRepository<Todo>;
    let api: TodoApi;
    let service: TodoService;

    beforeEach(() => {
        jest.useFakeTimers();
        repo = new InMemoryRepository<Todo>();
        api = new TodoApi(repo);
        service = new TodoService(api);
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    const runAsync = async <T>(promise: Promise<T>): Promise<T> => {
        const settled = promise.then(
            (value) => ({ status: 'fulfilled' as const, value }),
            (reason) => ({ status: 'rejected' as const, reason })
        );
        
        await jest.runAllTimersAsync();
        const result = await settled;
        if (result.status === 'rejected') throw result.reason;
        return result.value;
    };


    describe('TodoService', () => {
        describe('create()', () => {
            it('should successfully create a todo with trimmed title and description', async () => {
                const created = await runAsync(service.create(' Write unit tests ', 'Use Jest'));

                expect(created).toBeDefined();
                expect(created.id).toEqual(expect.any(Number));
                expect(created.title).toBe('Write unit tests');
                expect(created.description).toBe('Use Jest');
                expect(created.status).toBe(TodoStatus.PENDING);
            });

            it('should throw an error when title is empty or whitespace', async () => {
                await expect(service.create('    ')).rejects.toThrow("error create: title isn't settled");
            });
        });

        describe('toggleStatus()', () => {
            it ('should cycle status PENDING -> IN_PROGRESS -> COMPLETED -> PENDING', async () => {
                const todo = await runAsync(service.create('Toggle task'));
                expect(todo.status).toBe(TodoStatus.PENDING);

                const test1 = await runAsync(service.toggleStatus(todo.id));
                expect(test1.status).toBe(TodoStatus.IN_PROGRESS);

                const test2 = await runAsync(service.toggleStatus(todo.id));
                expect(test2.status).toBe(TodoStatus.COMPLETED);

                const test3 = await runAsync(service.toggleStatus(todo.id));
                expect(test3.status).toBe(TodoStatus.PENDING);
            });

            it('should throw an error when toggleng a non-existing id', async () => {
                await expect(runAsync(service.toggleStatus(9999))).rejects.toThrow(
                    "error toggleStatus: todo is undefined"
                );
            });
        });

        describe('setStatus()', () => {
            it('should update status to a valid TodoStatus', async () => {
                const todo = await runAsync(service.create('Set status task'));

                const updated = await runAsync(service.setStatus(todo.id, TodoStatus.COMPLETED));
                expect(updated.status).toBe(TodoStatus.COMPLETED);
            });

            it('should throw TodoNotFoundError when setStatus is called with a non-exicting id', async () => {
                await expect(runAsync(service.setStatus(9999, TodoStatus.PENDING))).rejects.toThrow(
                    TodoNotFoundError
                );

            });

            it('should throw an error when id is null or status is invalid', async () => {
                await expect(service.setStatus(null as unknown as number, TodoStatus.PENDING)).rejects.toThrow(
                    'error setStatus: parameters must be settled'
                );
            });
        });

        describe('search()', () => {
            it('should return matching items by title or description (case-insensitive)', async () => {
                await runAsync(service.create('Buy milk', 'From local store'));
                await runAsync(service.create('Study TypeScript', 'Generics and utility types'));
                await runAsync(service.create('Clean desk'));

                const byTitle = await runAsync(service.search('MILK'));
                expect(byTitle).toHaveLength(1);
                expect(byTitle[0].title).toBe('Buy milk');

                const byDescription = await runAsync(service.search('generics'));
                expect(byDescription).toHaveLength(1);
                expect(byDescription[0].title).toBe('Study TypeScript');
            });

            it('should thorw an error when search keyword is empty or whitespace', async () => {
                await expect(service.search('   ')).rejects.toThrow("error search: keyword isn't settled");
            });
        });
    });
});

describe('InMemodyRepository (direct unit tests for 90%+ coverage)', () => {
    interface TestEntity {
        id: number;
        name: string;
    }

    let testRepo: InMemoryRepository<TestEntity>;

    beforeEach(() => {
        testRepo = new InMemoryRepository<TestEntity>();
    });

    it('should add, findById, findAll, update, and remove entities', () => {
        const added = testRepo.add({ id: 1, name: 'First' });
        expect(added).toEqual({ id: 1, name: 'First' });
        expect(testRepo.findById(1)).toEqual({ id: 1, name: 'First' });
        expect(testRepo.findAll()).toEqual([{ id: 1, name: 'First' }]);

        // Update не должен перезаписывать id, даже если id передан в patch
        const updated = testRepo.update(1, { id: 999, name: 'Updated' });
        expect(updated).toEqual({ id: 1, name: 'Updated' });

        testRepo.remove(1);
        expect(testRepo.findById(1)).toBeUndefined();
        expect(testRepo.findAll()).toEqual([]);
    });

        it('should throw errors on invalid or non-existing ids', () => {
            const invalidId = undefined as unknown as number;

            expect(() => testRepo.findById(invalidId)).toThrow(`id is undefined`);
            expect(() => testRepo.update(invalidId, { name: 'X'})).toThrow(`id is undefined`);
            expect(() => testRepo.remove(invalidId)).toThrow(`id is undefined`);

            expect(() => testRepo.update(999, { name: 'X' })).toThrow('no entity with the given id exists');
            expect(() => testRepo.remove(999)).toThrow('no entity with the given id exists');
        });
    });