<script lang="ts" setup>
import TodoForm from "./TodoForm.vue";
import TodoDeleteButton from "./TodoDeleteButton.vue";
import TodoCompleteCheckbox from "./TodoCompleteCheckbox.vue";
import TodoEditingForm from "./TodoEditingForm.vue";
import { useTodoList } from "./useTodoList";

const todoList = useTodoList();
</script>

<template>
  <div class="card shadow-lg rounded-2xl p-4 max-w-lg">
    <TodoForm />
    <ul>
      <li v-for="todo in todoList" 
      className="mt-1 flex align-middle">
        <TodoCompleteCheckbox
          :todo="todo"
          :checkboxId="'todo-checkbox-' + todo.id"
        />
        <TodoEditingForm
          :todo="todo"
          :checkboxId="'todo-checkbox-' + todo.id"
        />
        <TodoDeleteButton :todo="todo" />
      </li>
    </ul>
  </div>
</template>
