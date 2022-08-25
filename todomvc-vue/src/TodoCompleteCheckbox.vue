<script lang="ts" setup>
import type { TodoT } from "../../src/global";
import { inject } from "./context";

const { todo, checkboxId } = defineProps<{
  todo: TodoT;
  checkboxId: string;
}>();

const { completeTodo } = inject("useActions")();
const onKeyup = (e: any) => {
  if (e.key === "Enter") {
    const checkbox = e.currentTarget as HTMLInputElement;
    completeTodo(todo.id, !checkbox.checked);
  }
};
</script>

<template>
  <input
    type="checkbox"
    :id="checkboxId"
    class="checkbox checkbox-lg mr-2 self-center"
    :aria-label="`할일 ${todo.content}을 완료하시려면 클릭하세요.`"
    :checked="todo.isCompleted"
    @change="(e) => {completeTodo(todo.id, (e.currentTarget as HTMLInputElement).checked)}"
    @keyup="onKeyup"
  />
</template>
