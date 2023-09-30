"use client";
import React, { useState } from "react";
import TodayTodoList from "../../components/Todos/TodayTodoList";
import TodoForm from "../../components/Todos/TodoForm";
import { Add } from "@mui/icons-material";
import styles from "./index.module.css";

const DUMMY_TODOS = [
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

const Today = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(DUMMY_TODOS);
  const [completedTodos, setCompletedTodos] = useState([]);
  const showButtonHandler = () => {
    setShow(true);
  };

  const closeButtonHandler = () => {
    setShow(false);
  };

  const addTaskHandler = (enteredFormData) => {
    setData((prev) => [...prev, enteredFormData]);
  };

  const deleteButtonHelper = (id) => {
    console.log("Delete button running!");
    setData((prev) => prev.filter((data) => data.id !== id));
  };

  const completedTaskHandler=(todo)=> {
    setCompletedTodos(prev=> [...prev, todo]);
    setData((prev) => prev.filter((data) => data.id !== todo.id));
  }
  return (
    <React.Fragment>
      <TodayTodoList
        onComplete={completedTaskHandler}
        onDeleteButton={deleteButtonHelper}
        todos={data}
      />
      {!show && (
        <button
          className={styles["add-task-button"]}
          onClick={showButtonHandler}
        >
          <Add />
          <span>Add task</span>
        </button>
      )}
      {show && (
        <TodoForm
          onAddTask={addTaskHandler}
          onCloseButton={closeButtonHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Today;
