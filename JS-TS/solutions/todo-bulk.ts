import { Todo, TodoStatus } from './types';

export function toggleAll(state: Todo[], completed: boolean): Todo[] {
  // sets every item to TodoStatus.COMPLETED when completed is true, otherwise to TodoStatus.PENDING
  const newState = state.map(todo => ({...todo}));

  for (const todo of newState) {
    if (completed) {
      todo.status = TodoStatus.COMPLETED;
    } else {
      todo.status = TodoStatus.PENDING;
    }
  }
  
  return newState;
}

export function clearCompleted(state: Todo[]): Todo[] {
  // removes completed todos
  return state.filter(todo => todo.status != TodoStatus.COMPLETED);
};

export function countByStatus(state: Todo[], status: TodoStatus): number {
  let count = 0;
  for (const todo of state)
    if (todo.status === status)
      count++;
  return count;
}
