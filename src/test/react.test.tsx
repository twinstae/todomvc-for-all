import React from 'react';
import { render } from '@testing-library/react';
import TodoMvcReact from '../frameworks/react/TodoMvcReact';

import runTest from "./runTest";

runTest({
    framework: 'react',
    render: (init) => render(<TodoMvcReact init={init} />)
})