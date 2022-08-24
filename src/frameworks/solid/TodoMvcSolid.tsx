/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/** @jsxImportSource solid-js */

import { For } from 'solid-js';
import { todoListStore } from "../nanoTodoListStore";
import { useStore } from '@nanostores/solid'
import TodoDeleteButton from './TodoDeleteButton';
import TodoForm from './TodoForm';
import TodoCompleteCheckbox from './TodoCompleteCheckbox';
import TodoEditingForm from './TodoEditingForm';

export default function TodoMvcSolid() {
  const todoList = useStore(todoListStore);

  return (
    <div class="card shadow-lg rounded-2xl p-4 max-w-lg">
      <TodoForm />
      <ul>
        <For each={todoList()}>{(todo) =>
        <li>
          <TodoCompleteCheckbox todo={todo} checkboxId={"todo-checkbox-" + todo.id} />
          <TodoEditingForm todo={todo} checkboxId={"todo-checkbox-" + todo.id} />
          <TodoDeleteButton todo={todo} />
        </li>
      }</For>
      </ul>
    </div>
  );
}