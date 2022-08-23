import { atom, action } from 'nanostores';
import { TodoT } from '../global';
import { generateId } from './generateId';

export const todoListStore = atom<TodoT[]>([])

export const actions = {
  addTodo: action(todoListStore, 'addTodo', (store, content: string) => {
    const newTodo = {
      id: generateId(),
      content,
      isCompleted: false,
    }
    store.set([...store.get(), newTodo])
  }),
  completeTodo: action(todoListStore, 'completeTodo', (store, id: number, isCompleted: boolean) => {
    const todoList = store.get();
    const todo = todoList.find((todo) => todo.id === id)
    if(todo){
      todo.isCompleted = isCompleted
    }
    store.set([...todoList]);
  }),
  changeTodo: action(todoListStore, 'changeTodo', (store,id: number, newContent: string) => {
    const todoList = store.get();
    const todo = todoList.find((todo) => todo.id === id)
    if(todo){
      todo.content = newContent
    }
    store.set([...todoList]);
  }),
  deleteTodo: action(todoListStore, 'deleteTodo', (store, id: number) => {
    store.set(store.get().filter((todo) => todo.id !== id)) 
  })
}
