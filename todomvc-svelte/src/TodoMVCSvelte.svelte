<script lang="ts">
  import { actions, todoListStore } from "@todomvc-core/nanoTodoListStore";
  import App from "./App.svelte";
  import { setActions, setTodoListStore } from "./context";

  setTodoListStore(todoListStore);
  setActions(actions);
</script>

<App />
