// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as ReactRedux from "react-redux";
import * as ReduxTodoListStore from "@todomvc-core/reduxTodoListStore";

var ReduxProvider = {};

function make(children) {
  return React.createElement(ReactRedux.Provider, {
              store: ReduxTodoListStore.reduxStore,
              children: children
            });
}

var ReduxWrapper = {
  make: make
};

export {
  ReduxProvider ,
  ReduxWrapper ,
}
/* react Not a pure module */
