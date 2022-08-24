import { useEffect } from 'react';
import { proxy, useSnapshot } from 'valtio'
import { watch } from 'valtio/utils'
import { TodoT } from '../../../global';
import { inject } from '../context';
import { generateId } from '../../generateId';
import { TodoActions } from '../../domain';

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



export function useValtioTodoList() {
  const snapShot = useSnapshot(store)
  useEffect(() => {
    const cleanup = watch((get) => {
      const todoList = get(store).todoList
      inject('storage').set('todo-list', todoList);
    })
    const saved = inject('storage').get('todo-list')
    if(saved){
      store.todoList = saved as TodoT[];
    }

    return cleanup;
  }, [])

  return {
    todoList: snapShot.todoList
  };
}

export const valtioActions = actions;