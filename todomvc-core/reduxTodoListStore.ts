
import type { TodoT } from './global'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, configureStore } from '@reduxjs/toolkit'
import { domain, type TodoActions } from './domain'
import { inject } from './sharedContainer'

interface TodoListState {
  todoList: TodoT[]
}

const initialState: TodoListState = {
  todoList: inject('storage').get('todo-list') as TodoT[] | undefined || [],
}

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    loadSaved(old, { payload }: PayloadAction<{ saved: TodoT[] }>){
      old.todoList = payload.saved
    },
    addTodo(old, { payload }: PayloadAction<Pick<TodoT, 'content'>>) {
      old.todoList = domain.addTodo(old.todoList, payload.content);
    },
    completeTodo(old, { payload }: PayloadAction<Pick<TodoT, 'id' | 'isCompleted'>>) {
      old.todoList = domain.completeTodo(old.todoList, payload.id, payload.isCompleted)
    },
    changeTodo(old, { payload }: PayloadAction<Pick<TodoT, 'id' | 'content'>>) {
      old.todoList = domain.changeTodo(old.todoList, payload.id, payload.content)
    },
    deleteTodo(old, { payload }: PayloadAction<Pick<TodoT, 'id'>>) {
      old.todoList = domain.deleteTodo(old.todoList, payload.id)
    },
  },
})

export const { addTodo, completeTodo, changeTodo, deleteTodo, loadSaved } = todoListSlice.actions

export const selectTodoList = (state: RootState) => state.todoList

function persist() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (next: any) => (action: any) => {
    const result = next(action)
    inject('storage').set('todo-list', result);
    return result
  }
}

export const reduxStore = configureStore({
  reducer: todoListSlice.reducer,
  middleware: [persist]
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

const dispatch = reduxStore.dispatch;

export const reduxActions: TodoActions = {
  addTodo(content) {
    dispatch(addTodo({ content }));
  },
  completeTodo(id, isCompleted) {
    dispatch(completeTodo({ id, isCompleted }));
  },
  changeTodo(id, content) {
    dispatch(changeTodo({ id, content }));
  },
  deleteTodo(id) {
    dispatch(deleteTodo({ id }));
  },
}