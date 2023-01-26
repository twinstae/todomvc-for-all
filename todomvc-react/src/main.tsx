import React from "react";
import TodoMvcReact from "@todomvc-react/TodoMvcReact";
import ReactDOMClient from "react-dom/client";
import "./main.css"

const root = ReactDOMClient.createRoot(document.getElementById('root')!)

root.render(<TodoMvcReact />)