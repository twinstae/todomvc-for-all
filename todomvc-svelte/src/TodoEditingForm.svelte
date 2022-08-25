<script lang="ts">
  import type { TodoT } from "../../src/global";
  import { inject } from "./context";

  export let checkboxId: string;
  export let todo: TodoT;

  let editInput = todo.content;
  let isEditing = false;
  let editInputRef: HTMLInputElement;

  const { changeTodo } = inject("actions");
</script>

<label for={checkboxId} class="label cursor-pointer p-0 grow">
  <span class="label-text w-full pl-5" hidden={isEditing}>
    {todo.content}
  </span>
</label>
<form
  class="flex align-middle m-0"
  on:submit={(e) => {
    e.preventDefault();
    changeTodo(todo.id, editInput);
    isEditing = false;
  }}
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
        editInputRef.focus()
      }}
      aria-label={`할일 ${todo.content}을 수정하시려면 클릭하세요.`}
    >
      수정
    </button>
  {/if}
</form>
