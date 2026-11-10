import { addTodo, updateTodo, removeTodo, getTodo } from "./solutions/todo-crud";
import { createTodo } from "./solutions/todo-factory";
import { TodoStatus } from "./solutions/types";

const state: any = [];
const todo = createTodo({ title: 'Write tests' });
const todo2 = createTodo({ title: 'Write tests' });
const state2 = addTodo(state, todo);
const state3 = updateTodo(state2, todo.id, { status: TodoStatus.COMPLETED });
