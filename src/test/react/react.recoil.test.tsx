import React from "react";
import { RecoilRoot } from "recoil";
import {
  useRecoilActions,
  useRecoilTodoList,
} from "../../frameworks/react/hooks/useRecoilTodoList";
import { runReactImpl } from "./runReactImpl";

runReactImpl(
  "recoil",
  useRecoilTodoList,
  useRecoilActions,
  ({ children }) => React.createElement(RecoilRoot, undefined, children)
);