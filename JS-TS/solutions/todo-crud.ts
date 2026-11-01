import { stat } from 'fs';
import { Todo } from './types';
import { error } from 'console';

// helpers
const todoStateCopy = (arr:Todo[]) => arr.map(item => ({...item}));
const findIndexById = function (newState: Todo[], id: number): number {
    const idx = newState.findIndex(x => x.id === id);
    if (idx === -1)
        throw new Error("No such todo");
    return idx;
}

export function addTodo(state: Todo[], todo: Todo): Todo[] {
    // returns state of todos with new todo
    let newState = todoStateCopy(state);
    newState.push({...todo});
    return newState;  
}

export function updateTodo(state: Todo[], id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo[] {
    // returns updated state
    let newState = todoStateCopy(state);
    let idx = findIndexById(newState, id);
        Object.assign(newState[idx], update);
    return newState;
}

export function removeTodo(state: Todo[], id: number): Todo[] {
    // removes todo from the new state and returns new state
    findIndexById(state, id);
    return state.filter(elem => elem.id != id);
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
    // gets a todo by id
    const result = state.filter(elem => elem.id === id);
    if (result.length > 1)
        throw new Error("There is few elements with id: " + id);
    return result[0];
}