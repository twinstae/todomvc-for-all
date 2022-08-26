<script lang="ts">
  import type { TodoT } from "@core/global";
  import TodoCompleteCheckbox from "@/TodoCompleteCheckbox.svelte";
  import TodoDeleteButton from "@/TodoDeleteButton.svelte";
  import TodoEditingForm from "@/TodoEditingForm.svelte";
  import { getActions } from "@/context";

  export let todo: TodoT;
  const { deleteTodo } = getActions();

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
