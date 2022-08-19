import React, { useState } from 'react';

function TodoMvcReact(){
    const todoList = ["투두 상태 구현", "마크업", "어쩌구"];
    return <>
    <h1>Todo MVC</h1>
    <ul>
        {todoList.map((todo) => <li key={todo}>{todo}</li>)}
    </ul>
    </>
}

export default TodoMvcReact;