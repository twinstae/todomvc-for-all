<script lang="ts" setup>
import type { TodoT } from "../../global";
import { ref } from "vue";

import { inject } from "./context";

const { todo, checkboxId } = defineProps<{
  checkboxId: string;
  todo: TodoT;
}>();

const editInput = ref(todo.content);
const isEditing = ref(false);
const editInputRef = ref<HTMLInputElement | null>(null);

const { changeTodo } = inject("useActions")();

function startEdit() {
  isEditing.value = true;
  editInputRef.value?.focus();
}
</script>
<template>
  <label :for="checkboxId" class="label cursor-pointer p-0 grow">
    <span class="label-text w-full pl-5" :hidden="isEditing">
      {{ todo.content }}
    </span>
  </label>
  <form
    class="flex align-middle m-0"
    @submit="
      (e) => {
        e.preventDefault();
        changeTodo(todo.id, editInput);
        isEditing = false;
      }
    "
  >
    <input
      type="text"
      v-model="editInput"
      ref="editInputRef"
      :hidden="!isEditing"
      placeholder="{todo.content}"
      class="input input-bordered input-sm w-full m-2"
    />
    <button
      v-if="isEditing"
      type="submit"
      class="btn btn-primary btn-sm m-2"
      :aria-label="`할일을 ${todo.content}에서 ${editInput}로 수정하시려면 클릭하세요.`"
    >
      완료
    </button>
    <button
      v-else="isEditing"
      type="button"
      class="btn btn-primary btn-sm m-2"
      @click="startEdit"
      :aria-label="`할일 ${todo.content}을 수정하시려면 클릭하세요.`"
    >
      수정
    </button>
  </form>
</template>
