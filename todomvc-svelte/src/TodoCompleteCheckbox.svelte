<script lang="ts">
  import type { TodoT } from "../../src/global";

  import { inject } from "./context";

  export let todo: TodoT;
  export let checkboxId: string;

  const { completeTodo } = inject("actions");
</script>

<input
  id={checkboxId}
  type="checkbox"
  class="checkbox checkbox-lg mr-2 self-center"
  aria-label={`할일 ${todo.content}을 완료하시려면 클릭하세요.`}
  checked={todo.isCompleted}
  on:keyup={(e) => {
    if (e.key === "Enter") {
      const checkbox = e.currentTarget;
      completeTodo(todo.id, !checkbox.checked);
    }
  }}
  on:change={(e) => completeTodo(todo.id, e.currentTarget.checked)}
/>
