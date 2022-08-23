import { useLayoutEffect } from 'react';
import { proxy, useSnapshot } from 'valtio'
import { watch } from 'valtio/utils'
import { TodoT } from '../../global';
import { inject } from './context';
import { generateId } from '../generateId';

export const store = proxy<{
  todoList: TodoT[]
}>({
  todoList: []
})

export const actions = {
  addTodo(content: string) {
    store.todoList.push({
      id: generateId(),
      content,
      isCompleted: false,
    })
  },
  completeTodo(id: number, isCompleted: boolean) {
    const todo = store.todoList.find((todo) => todo.id === id)
    if(todo){
      todo.isCompleted = isCompleted
    }
  },
  changeTodo(id: number, newContent: string) {
    const todo = store.todoList.find((todo) => todo.id === id)
    if(todo){
      todo.content = newContent
    }
  },
  deleteTodo(id: number) {
    store.todoList = store.todoList.filter((todo) => todo.id !== id)
  }
}

watch((get) => {
  const todoList = get(store).todoList
  inject('storage').set('todo-list', todoList);
})

export function useValtioTodoList() {
  const snapShot = useSnapshot(store)
  useLayoutEffect(() => {
    const saved = inject('storage').get('todo-list')
    if(saved){
      store.todoList = saved;
    }
  }, [])

  return {
    todoList: snapShot.todoList,
    ...actions,
  };
}