<script lang="ts" setup>
import type { TodoT } from "@todomvc-core/global";
import { useActions } from "./useActions";

const { todo, checkboxId } = defineProps<{
  todo: TodoT;
  checkboxId: string;
}>();

const { completeTodo } = useActions();
</script>

<template>
  <input
    type="checkbox"
    :id="checkboxId"
    class="checkbox checkbox-lg mr-2 self-center"
    :aria-label="`할일 ${todo.content}을 완료하시려면 클릭하세요.`"
    :checked="todo.isCompleted"
    @change="(e) => {completeTodo(todo.id, (e.currentTarget as HTMLInputElement).checked)}"
    @keyup.space="(e: any) => {
    const checkbox = e.currentTarget as HTMLInputElement;
    completeTodo(todo.id, !checkbox.checked);
}"
  />
</template>
