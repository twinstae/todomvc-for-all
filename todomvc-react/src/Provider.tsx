import React from 'react';
import type { TodoT } from '@core/global';
import type { TodoActions } from '@core/domain';
import { UseActionsContext } from '@/useActions';
import { UseTodoListContext } from '@/useTodoList';

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