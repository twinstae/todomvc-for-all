<script lang="ts">
  import strs from "@todomvc-core/strs";
  import { getActions } from "./context";

  let todoInput: string = "";

  const { addTodo } = getActions();
  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    addTodo(todoInput);
    todoInput = "";
  }
</script>

<form on:submit={onSubmit} class="p-0 m-0">
  <label class="inline-block  grow">
    {strs.addTodoLabel}
    <br />
    <input
      type="text"
      bind:value={todoInput}
      class="input input-bordered w-full"
      placeholder="react 공부하기"
    />
  </label>
  <button
    type="submit"
    class="btn btn-primary btn-sm m-2"
    aria-label={`새로운 할 일 ${todoInput}을 추가하시려면 클릭해주세요`}
  >
    추가
  </button>
</form>
