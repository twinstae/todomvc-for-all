<script lang="ts" setup>
import { provide } from "./context";
import { useStore } from "@nanostores/vue";
import { actions, todoListStore } from "../../src/nanoTodoListStore";
import App from "./App.vue";

provide("useTodoList", () => useStore(todoListStore));
provide("useActions", () => actions);
</script>

<template>
  <App />
</template>
