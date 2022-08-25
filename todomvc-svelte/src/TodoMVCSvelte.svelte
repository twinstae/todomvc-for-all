<script lang="ts" context="module">
  import { actions, todoListStore } from "../../src/nanoTodoListStore";

  import App from "./App.svelte";
  import { provide } from "./context";

  provide("todoList", todoListStore);
  provide("actions", actions);
</script>

<App />
