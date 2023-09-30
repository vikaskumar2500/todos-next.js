"use client";

import React, { useState } from "react";
import CompletedTodoList from "../../../components/Todos/CompletedTodoList";

const DUMMY_COMPLETED = [
  {
    id: "t1",
    text: "Revision DSA",
    description: "With in two weeks",
  },
  {
    id: "t2",
    text: "Revision React.js",
    description: "With in two days",
  },
  {
    id: "t3",
    text: "Revision next.js",
    description: "With in four weeks",
  },
];

const CompletedTodos = () => {
  const [completedTask, setCompletedTask] = useState(DUMMY_COMPLETED);
  const completedTaskHandler = (id) => {
    setCompletedTask((prev) => prev.filter((todo) => todo.id !== id));
  };
  return (
    <CompletedTodoList
      onComplete={completedTaskHandler}
      completed={completedTask}
    />
  );
};

export default CompletedTodos;
