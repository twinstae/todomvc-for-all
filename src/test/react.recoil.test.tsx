
import React from "react";
import { RecoilRoot } from "recoil";
import {
  useRecoilActions,
  useRecoilTodoList,
} from "../frameworks/react/hooks/useRecoilTodoList";
import { runReactImpl } from "./runReactImpl";

runReactImpl("redux", useRecoilTodoList, useRecoilActions, ({ children }) => (
  <RecoilRoot>{children}</RecoilRoot>
));