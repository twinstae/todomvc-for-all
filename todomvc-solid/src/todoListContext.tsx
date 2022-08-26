/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/** @jsxImportSource solid-js */
import type { JSX } from "solid-js/types/jsx";

import { createContext, createEffect, useContext } from "solid-js";
import { createStore } from 'solid-js/store';
import { TodoT } from "@core/global";
import { domain, TodoActions } from "@core/domain";
import * as shared from "@core/sharedContainer";

const TodoListContext = createContext();
const TodoActionsContext = createContext();

export function TodoListWrapper(props: { children: JSX.Element, init: TodoT[] }) {
  const [todoList, setTodoList] = createStore<TodoT[]>(props.init || []);

  const effect = () => {
    shared.inject('storage').set('todo-list', todoList);
  };
  createEffect(effect)
  const actions: TodoActions = {
    addTodo(content){
      setTodoList(domain.addTodo(todoList, content));
    },
    completeTodo(id, isCompleted){
      setTodoList(todo => todo.id === id, 'isCompleted', isCompleted);
      effect();
    },
    changeTodo(id, content){
      setTodoList(todo => todo.id === id, 'content', content);
      effect();
    },
    deleteTodo(id){
      setTodoList(domain.deleteTodo(todoList, id));
    }
  }
  return (
    <TodoListContext.Provider value={todoList}>
      <TodoActionsContext.Provider value={actions}>
        {props.children}
      </TodoActionsContext.Provider>
    </TodoListContext.Provider>
  );
}

export function useTodoList() {
  return () => useContext(TodoListContext) as TodoT[];
}
export function useTodoActions() {
  return useContext(TodoActionsContext) as TodoActions;
}