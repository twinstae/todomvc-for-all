<script lang="ts">
  import { inject } from "./context";
  import TodoForm from "./TodoForm.svelte";
  import TodoItem from "./TodoItem.svelte";

  const todoList = inject("todoList");
</script>

<div class="card shadow-lg rounded-2xl p-4 max-w-lg">
  <TodoForm />
  <ul>
    {#each $todoList as todo (todo.id)}
      <TodoItem {todo} />
    {/each}
  </ul>
</div>
