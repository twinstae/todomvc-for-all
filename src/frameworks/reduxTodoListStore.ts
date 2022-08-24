import { createSlice, configureStore } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TodoT } from "../global";
import { domain } from "./domain";
import { inject } from "./react/context";

interface TodoListState {
  todoList: TodoT[];
}

const initialState: TodoListState = {
  todoList: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    loadSaved(old, { payload }: PayloadAction<{ saved: TodoT[] }>) {
      old.todoList = payload.saved;
    },
    addTodo(old, { payload }: PayloadAction<Pick<TodoT, "content">>) {
      old.todoList = domain.addTodo(old.todoList, payload.content);
    },
    completeTodo(
      old,
      { payload }: PayloadAction<Pick<TodoT, "id" | "isCompleted">>
    ) {
      old.todoList = domain.completeTodo(
        old.todoList,
        payload.id,
        payload.isCompleted
      );
    },
    changeTodo(old, { payload }: PayloadAction<Pick<TodoT, "id" | "content">>) {
      old.todoList = domain.changeTodo(
        old.todoList,
        payload.id,
        payload.content
      );
    },
    deleteTodo(old, { payload }: PayloadAction<Pick<TodoT, "id">>) {
      old.todoList = domain.deleteTodo(old.todoList, payload.id);
    },
  },
});

export const { addTodo, completeTodo, changeTodo, deleteTodo, loadSaved } =
  todoListSlice.actions;

export const selectTodoList = (state: RootState) => state.todoList;

function persist() {
  return (next: any) => (action: any) => {
    const result = next(action);
    inject("storage").set("todo-list", result);
    return result;
  };
}

export const store = configureStore({
  reducer: todoListSlice.reducer,
  middleware: [persist],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
