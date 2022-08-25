<script lang="ts">
  import type { TodoT } from "../../src/global";

  import { inject } from "./context";
  import TodoCompleteCheckbox from "./TodoCompleteCheckbox.svelte";
  import TodoDeleteButton from "./TodoDeleteButton.svelte";
  import TodoEditingForm from "./TodoEditingForm.svelte";

  export let todo: TodoT;
  const { deleteTodo } = inject("actions");

  const checkboxId = "todo-checkbox-" + todo.id;
</script>

<li
  class="mt-1 flex align-middle "
  on:keyup={(e) => {
    if (e.key === "Delete") deleteTodo(todo.id);
  }}
>
  <TodoCompleteCheckbox {todo} {checkboxId} />
  <TodoEditingForm {todo} {checkboxId} />
  <TodoDeleteButton {todo} />
</li>
