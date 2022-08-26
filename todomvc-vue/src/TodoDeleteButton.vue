<script lang="ts" setup>
import type { TodoT } from "../../todomvc-core/global";
import { useActions } from "./useActions";
const { todo } = defineProps<{ todo: TodoT }>();

const { deleteTodo } = useActions();
</script>

<template>
  <button
    type="button"
    class="btn btn-error btn-sm m-2 mr-0"
    @click="() => deleteTodo(todo.id)"
    :aria-label="`할일 ${todo.content}을 삭제하시려면 클릭하시거나 Delete 키를 누르세요.`"
  >
    삭제
  </button>
</template>
