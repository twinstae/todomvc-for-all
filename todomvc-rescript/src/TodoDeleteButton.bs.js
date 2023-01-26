// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as TodoContext from "./TodoContext.bs.js";

function TodoDeleteButton(props) {
  var todoId = props.todoId;
  var todoActions = TodoContext.useTodoActions(undefined);
  var onClick = function (_event) {
    todoActions.deleteTodo(todoId);
  };
  return React.createElement("button", {
              className: "btn btn-sm btn-error",
              type: "button",
              onClick: onClick
            }, "삭제");
}

var make = TodoDeleteButton;

export {
  make ,
}
/* react Not a pure module */
