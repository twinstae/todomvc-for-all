<script lang="ts">
  import { setActions, setTodoListStore, type Subscribable } from "./context";
  import type { TodoActions } from "../../src/domain";
  import type { TodoT } from "../../src/global";

  import App from "./App.svelte";

  export let todoListStore: Subscribable<TodoT[]>;
  export let actions: TodoActions;

  setTodoListStore(todoListStore);
  setActions(actions);
</script>

<App />
