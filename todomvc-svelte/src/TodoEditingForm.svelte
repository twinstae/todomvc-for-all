<script lang="ts">
  import type { TodoT } from "@todomvc-core/global";
  import { getActions } from "./context";

  export let checkboxId: string;
  export let todo: TodoT;

  let editInput = todo.content;
  let isEditing = false;
  let editInputRef: HTMLInputElement;

  $: isEditing && editInputRef.focus();

  const { changeTodo } = getActions();

  function onSubmit(){
    changeTodo(todo.id, editInput);
    isEditing = false;
  };
</script>

<label for={checkboxId} class="label cursor-pointer p-0 grow">
  <span class="label-text w-full pl-5" hidden={isEditing}>
    {todo.content}
  </span>
</label>
<form
  class="flex align-middle m-0"
  on:submit|preventDefault={onSubmit}
>
  <input
    bind:value={editInput}
    bind:this={editInputRef}
    hidden={!isEditing}
    type="text"
    placeholder={todo.content}
    class="input input-bordered input-sm w-full m-2"
  />
  {#if isEditing}
    <button
      type="submit"
      class="btn btn-primary btn-sm m-2"
      aria-label={`할일을 ${todo.content}에서 ${editInput}로 수정하시려면 클릭하세요.`}
    >
      완료
    </button>
  {:else}
    <button
      type="button"
      class="btn btn-primary btn-sm m-2"
      on:click={() => {
        isEditing = true;
      }}
      aria-label={`할일 ${todo.content}을 수정하시려면 클릭하세요.`}
    >
      수정
    </button>
  {/if}
</form>
