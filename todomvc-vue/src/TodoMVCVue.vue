<script lang="ts" setup>
import { useStore } from "@nanostores/vue";
import { actions, todoListStore } from "@core/nanoTodoListStore";
import { provideUseActions } from '@/useActions';
import { provideUseTodoList } from '@/useTodoList';
import App from "@/App.vue";

provideUseTodoList(() => useStore(todoListStore));
provideUseActions(() => actions);
</script>

<template>
  <App />
</template>
