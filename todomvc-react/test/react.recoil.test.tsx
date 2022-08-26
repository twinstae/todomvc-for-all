import React from "react";
import { RecoilRoot } from "recoil";
import {
  useRecoilActions,
  useRecoilTodoList,
} from "@todomvc-react/hooks/useRecoilTodoList";
import { runReactImpl } from "./runReactImpl";

runReactImpl(
  "recoil",
  useRecoilTodoList,
  useRecoilActions,
  ({ children }) => <RecoilRoot>{children}</RecoilRoot>
);