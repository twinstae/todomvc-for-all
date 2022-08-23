import { atom, action, WritableAtom } from 'nanostores';
import { TodoT } from '../global';
import { generateId } from './generateId';

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

export const todoListStore = atom<TodoT[]>([])

function createActions<T, R extends Record<string, (old: T, ...args: any) => T>>(store: WritableAtom<T>, rawActions: R){
  return Object.fromEntries(Object.entries(rawActions).map(([name, rawAction]) => {
    return [name, action(store, name, (store, ...args) => {
      const old = store.get();
      store.set(rawAction(old, ...args))
    })]
  }))
}

export const actions = createActions(todoListStore, {
  addTodo(old, content: string) {
    const newTodo = {
      id: generateId(),
      content,
      isCompleted: false,
    }
    return [...old, newTodo]
  },
  completeTodo(old, id: number, isCompleted: boolean) {
    const todo = old.find((todo) => todo.id === id)
    if(todo){
      todo.isCompleted = isCompleted
    }
    return [...old];
  },
  changeTodo(old, id: number, newContent: string) {
    const todo = old.find((todo) => todo.id === id)
    if(todo){
      todo.content = newContent
    }
    return [...old];
  },
  deleteTodo(old, id: number) {
    return old.filter((todo) => todo.id !== id)
  }
}) as {
  addTodo(content: string): void;
  completeTodo(id: number, isCompleted: boolean): void;
  changeTodo(id: number, newContent: string): void;
  deleteTodo(id: number): void;
}
