import React from 'react';
import type { TodoT } from '@todomvc-core/global';
import type { TodoActions } from '@todomvc-core/domain';
import { UseActionsContext } from '@todomvc-react/useActions';
import { UseTodoListContext } from '@todomvc-react/useTodoList';

export default function Provider({useTodoList, useActions, children}: {
  useTodoList: () => {
    todoList: readonly TodoT[];
},
  useActions: () => TodoActions,
  children: React.ReactNode
}){
  return (
    <UseTodoListContext.Provider value={useTodoList}>
      <UseActionsContext.Provider value={useActions}>
        {children}
      </UseActionsContext.Provider>
    </UseTodoListContext.Provider>
  )
}