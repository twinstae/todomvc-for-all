import { defineStore } from 'pinia'
import type { TodoT } from '../../global'
import { createActionsWithSetState } from '../createActionsWithSetState'
import { domain } from '../domain'

export const usePiniaTodoList = defineStore('todoList', {
  state: () => ({
    todoList: [] as TodoT[],
  }),
  actions: createActionsWithSetState<TodoT[], typeof domain>(function (this: { todoList: TodoT[] }, update){
    this.todoList = update(this.todoList)
  }, domain),
})