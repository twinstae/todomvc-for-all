<script lang="ts" context="module">
import { setContext } from "svelte/types/runtime/internal/lifecycle";

  import { actions, todoListStore } from "../../src/nanoTodoListStore";

  import App from "./App.svelte";
import { setActions, setTodoListStore } from "./context";

  setTodoListStore(todoListStore);
  setActions(actions);
</script>

<App />
