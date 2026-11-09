import { stat } from 'fs';
import { Todo, TodoStatus } from './types';

export function toggleAll(state: Todo[], completed: boolean): Todo[] {
  // sets every item to TodoStatus.COMPLETED when completed   
  //   is true, otherwise to TodoStatus.PENDING
  return state.map(todo => {
    const copyTodo = { ...todo };
    copyTodo.status = (completed) ? TodoStatus.COMPLETED : TodoStatus.PENDING;
    return copyTodo;
  });
}

export function clearCompleted(state: Todo[]): Todo[] {
  // removes completed todos
  return state.filter(todo => todo.status !== TodoStatus.COMPLETED);
}; 

export function countByStatus(state: Todo[], status: TodoStatus): number {
  return state.reduce((count, todo) => (todo.status === status) ? count + 1 : count, 0);
}
