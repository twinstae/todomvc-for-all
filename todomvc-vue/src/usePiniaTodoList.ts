import { defineStore } from 'pinia'
import type { TodoT } from '@core/global'
import { createActionsWithSetState } from '@core/createActionsWithSetState'
import { domain } from '@core/domain'

export const usePiniaTodoList = defineStore('todoList', {
  state: () => ({
    todoList: [] as TodoT[],
  }),
  actions: createActionsWithSetState<TodoT[], typeof domain>(function (this: { todoList: TodoT[] }, update){
    this.todoList = update(this.todoList)
  }, domain),
})