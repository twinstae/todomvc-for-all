
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import {
  useReduxActions,
  useReduxTodoList,
} from "../../frameworks/react/hooks/useReduxTodoList";
import { store } from "../../frameworks/reduxTodoListStore";
import { runReactImpl } from "./runReactImpl";

runReactImpl(
  "redux",
  useReduxTodoList,
  useReduxActions,
  ({ children }) => (
  <ReduxProvider store={store}>{children}</ReduxProvider>
));