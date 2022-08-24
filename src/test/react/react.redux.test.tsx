
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import {
  useReduxActions,
  useReduxTodoList,
} from "../../frameworks/react/hooks/useReduxTodoList";
import { loadSaved, reduxStore } from "../../frameworks/reduxTodoListStore";
import { runReactImpl } from "./runReactImpl";

runReactImpl(
  "redux",
  useReduxTodoList,
  useReduxActions,
  ({ children }) => (
  <ReduxProvider store={reduxStore}>{children}</ReduxProvider>
  ),
  async (init) => {
    reduxStore.dispatch(loadSaved({ saved: init }));
  }
);