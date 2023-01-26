// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as TodoContext from "./TodoContext.bs.js";

function TodoForm(props) {
  var match = TodoContext.useTodoActions(undefined);
  var addTodo = match.addTodo;
  var match$1 = React.useState(function () {
        return "";
      });
  var setText = match$1[1];
  var text = match$1[0];
  var onChange = function (evt) {
    Curry._1(setText, (function (_prev) {
            return evt.target.value;
          }));
  };
  var onSubmit = function ($$event) {
    $$event.preventDefault();
    addTodo(text);
  };
  return React.createElement("form", {
              onSubmit: onSubmit
            }, React.createElement("label", {
                  className: "inline-block grow"
                }, "새로운 할일", React.createElement("input", {
                      className: "input input-bordered w-full",
                      type: "text",
                      value: text,
                      onChange: onChange
                    })), React.createElement("button", {
                  "aria-label": "새로운 할 일 " + text + "을 추가하시려면 클릭해주세요",
                  className: "btn btn-primary btn-sm",
                  type: "submit"
                }, "추가"));
}

var make = TodoForm;

export {
  make ,
}
/* react Not a pure module */
