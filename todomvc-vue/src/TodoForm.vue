<script lang="ts" setup>
import { ref } from "vue";
import strs from "@todomvc-core/strs";
import { useActions } from "./useActions";

const todoInput = ref("");

const { addTodo } = useActions();
function onSubmit(e: Event) {
  e.preventDefault();
  addTodo(todoInput.value);
  todoInput.value = "";
}
</script>

<template>
  <form @submit="onSubmit" class="p-0 m-0">
    <label class="inline-block grow">
      {{ strs.addTodoLabel }}
      <br />
      <input
        type="text"
        v-model="todoInput"
        class="input input-bordered w-full"
        placeholder="react 공부하기"
      />
    </label>
    <button
      type="submit"
      class="btn btn-primary btn-sm m-2"
      :aria-label="`새로운 할 일 ${todoInput}을 추가하시려면 클릭해주세요`"
    >
      추가
    </button>
  </form>
</template>
