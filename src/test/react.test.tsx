import React from 'react';
import { render } from '@testing-library/react';
import TodoMvcReact from '../frameworks/react/TodoMvcReact';

import runTest from "./runTest";
import { provide } from '../dependency';

runTest({
    framework: 'react',
    render: (init) => {
        provide('storage', new Map([['todo-list', init]]));
        
        render(<TodoMvcReact />)
    }
})