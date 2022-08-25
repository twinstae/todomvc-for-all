import { proxy, useSnapshot } from 'valtio'
import { watch } from 'valtio/utils'
import type { TodoT } from '../../../src/global';
import * as shared from "../../../src/sharedContainer";
import { generateId } from '../../../src/generateId';
import { TodoActions } from '../../../src/domain';

export const store = proxy<{
  todoList: TodoT[]
}>({
  todoList: []
})

export const actions: TodoActions = {
  addTodo(content) {
    if (content.length === 0) return;
    
    store.todoList.push({
      id: generateId(),
      content,
      isCompleted: false,
    })
  },
  completeTodo(id, isCompleted) {
    const todo = store.todoList.find((todo) => todo.id === id)
    if(todo){
      todo.isCompleted = isCompleted
    }
  },
  changeTodo(id, newContent) {
    const todo = store.todoList.find((todo) => todo.id === id)
    if(todo){
      todo.content = newContent
    }
  },
  deleteTodo(id) {
    store.todoList = store.todoList.filter((todo) => todo.id !== id)
  }
}

watch((get) => {
  const todoList = get(store).todoList
  shared.inject('storage').set('todo-list', todoList);
})

export function useValtioTodoList() {
  return useSnapshot(store);
}

export const valtioActions = actions;