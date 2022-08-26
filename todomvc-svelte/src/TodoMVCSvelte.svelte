<script lang="ts" context="module">
  import { actions, todoListStore } from "@core/nanoTodoListStore";
  import App from "@/App.svelte";
  import { setActions, setTodoListStore } from "@/context";

  setTodoListStore(todoListStore);
  setActions(actions);
</script>

<App />
