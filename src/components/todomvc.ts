import type { TodoT } from "@todomvc-core/global";
// // redux impl
// import { reduxStore, reduxActions } from "@todomvc-core/reduxTodoListStore";
// const actions = reduxActions;
// const store: {
//   subscribe(callback: (todoList: readonly TodoT[]) => void): void;
// } = {
//   subscribe(callback: (todoList: TodoT[]) => void){
//     reduxStore.subscribe(() => callback(reduxStore.getState().todoList));
//     callback(reduxStore.getState().todoList);
//   }
// }

// nano impl
import { actions, todoListStore } from "@todomvc-core/nanoTodoListStore";
const store: {
  subscribe(callback: (todoList: readonly TodoT[]) => void): void;
} = todoListStore;

interface HTMLAttributes {
  id?: string;
  class?: string;
  "data-action"?: string;
  type?: string;
  "aria-label"?: string;
  checked?: boolean;
  for?: string;
  placeholder?: string;
  hidden?: boolean;
  value?: string;
  onclick?: (e: MouseEvent) => void;
  onsubmit?: (e: SubmitEvent) => void;
  onchange?: (e: Event) => void;
  onkeyup?: (e: KeyboardEvent) => void;
}

function h<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options: HTMLAttributes = {},
  children: string | HTMLElement[] = []
): HTMLElement {
  const $el = document.createElement(tagName);

  for (const key in options) {
    if (key.startsWith("on")) {
      $el.addEventListener(key.slice(2), options[key]);
    } else if (key in $el) {
      $el[key] = options[key];
    } else {
      $el.setAttribute(key, options[key]);
    }
  }

  if (typeof children === "string") {
    $el.textContent = children;
  } else {
    children.forEach((child) => $el.appendChild(child));
  }
  return $el;
}

export default function start() {
  function createTodoItem(todo: TodoT) {
    if (todo === undefined) {
      return;
    }

    const $todoText = h(
      "label",
      {
        for: "todo-checkbox-1",
        class: "label cursor-pointer p-0 grow w-80",
      },
      [
        h(
          "span",
          {
            class: "label-text w-full pl-5",
          },
          todo.content
        ),
      ]
    );

    const $editInput = h("input", {
      type: "text",
      placeholder: todo.content,
      class: "input input-bordered input-sm w-80 ml-2 mt-2",
      value: todo.content,
      onchange: () => {
        $editSubmitButton.setAttribute(
          "aria-label",
          `할일을 ${todo.content}에서 ${$editInput.value}로 수정하시려면 클릭하세요.`
        );
      },
    }) as HTMLInputElement;

    const $editSubmitButton = h(
      "button",
      {
        type: "submit",
        class: "btn btn-primary btn-sm m-2 no-animation",
        "aria-label": `할일을 ${todo.content}에서 ${todo.content}로 수정하시려면 클릭하세요.`,
      },
      "완료"
    );

    const $editStartButton = h(
      "button",
      {
        type: "button",
        class: "btn btn-primary btn-sm m-2 no-animation",
        "aria-label": `할일 ${todo.content} 수정하시려면 클릭하세요`,
        onclick: () => {
          $todoText.remove();
          $editStartButton.before($editInput);
          $editInput.focus();
          $editStartButton.replaceWith($editSubmitButton);
        },
      },
      "수정"
    ) as HTMLButtonElement;

    const $checkbox = h("input", {
      id: `todo-checkbox-${todo.id}`,
      type: "checkbox",
      class: "checkbox checkbox-lg mr-2 self-center",
      checked: todo.isCompleted,
      onkeyup: (e) => {
        if (e.key === "Space") {
          const $check = e.target as HTMLInputElement;
          $check.checked = !$check.checked;
        }
      },
      onchange: (e) => {
        const $check = e.target as HTMLInputElement;
        actions.completeTodo(todo.id, $check.checked);
      },
      "aria-label": `할일 ${todo.content} 완료하시려면 클릭하세요.`,
    }) as HTMLInputElement;

    const $deleteButton = h(
      "button",
      {
        type: "button",
        class: "btn btn-outline btn-sm m-2 mr-0 no-animation",
        "aria-label": `할일 ${todo.content} 삭제하시려면 클릭하시거나 Delete 키를 누르세요.`,
        onclick: () => actions.deleteTodo(todo.id),
      },
      "삭제"
    );

    function onsubmit(e) {
      e.preventDefault();

      const newContent = $editInput.value;
      $todoText.children[0].textContent = newContent;

      $editInput.placeholder = newContent;
      $checkbox.after($todoText);
      $editInput.remove();

      $editStartButton.setAttribute(
        "aria-label",
        `할일 ${newContent} 수정하시려면 클릭하세요`
      );

      $checkbox.setAttribute(
        "aria-label",
        `할일 ${newContent} 완료하시려면 클릭하세요.`
      );

      $deleteButton.setAttribute(
        "aria-label",
        `할일 ${newContent} 삭제하시려면 클릭하시거나 Delete 키를 누르세요.`
      );

      $editSubmitButton.setAttribute(
        "aria-label",
        `할일을 ${newContent}에서 ${newContent}로 수정하시려면 클릭하세요.`
      );
      $editSubmitButton.replaceWith($editStartButton);
      actions.changeTodo(todo.id, $editInput.value);
    }

    const $item = h(
      "li",
      { id: `todo-${todo.id}`, class: "mt-1 flex align-middle" },
      [
        $checkbox,
        $todoText,
        h(
          "form",
          {
            class: "flex align-middle m-0",
            onsubmit,
          },
          [$editStartButton]
        ),
        $deleteButton,
      ]
    );

    return $item;
  }

  const $todoList = document.getElementById("todolist-container")!;

  function renderList(todoList: readonly TodoT[]) {
    todoList.forEach((todo, i) => {
      const child = $todoList.children[i];
      if (child === undefined) {
        const $item = createTodoItem(todo);
        $todoList.appendChild($item);
      } else if (`todo-${todo.id}` !== child?.id) {
        const $item = createTodoItem(todo);
        child.replaceWith($item);
      }
    });
    while (todoList.length < $todoList.children.length) {
      $todoList.children[$todoList.children.length - 1].remove();
    }
  }
  store.subscribe((todoList) => {
    renderList(todoList || []);
  });

  const $todoForm = document.getElementById("todo-form")!;

  $todoForm.onsubmit = function (e: SubmitEvent) {
    e.preventDefault();

    const $todoForm = e.target as HTMLFormElement;

    actions.addTodo(
      ($todoForm.elements[0] as HTMLInputElement).value as string
    );
    $todoForm.reset();
  };
}
