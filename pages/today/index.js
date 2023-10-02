"use client";

import React, { useState } from "react";
import TodayTodoList from "../../components/Todos/TodayTodoList";
import TodoForm from "../../components/Todos/TodoForm";
import { Add } from "@mui/icons-material";
import styles from "./index.module.css";
import { MongoClient } from "mongodb";

const Today = ({ todosList }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(todosList);

  const showButtonHandler = () => {
    setShow(true);
  };

  const closeButtonHandler = () => {
    setShow(false);
  };

  const addTaskHandler = async (enteredFormData) => {
    setData((prev) => [enteredFormData, ...prev]);
    try {
      const response = await fetch("/api/today", {
        method: "POST",
        body: JSON.stringify(enteredFormData),
        headers: { "Content-Type": "application/json" },
      });

      const postData = await response.json();
      if (!response.ok) throw new Error(postData.error);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const deleteButtonHelper = async (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    try {
      const response = await fetch(`/api/today/?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const completedTaskHandler = async (todo) => {
    setData((prev) => prev.filter((item) => item.id !== todo.id));
    try {
      const updateResponse = await fetch(`/api/today?id=${todo.id}`, {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
      });

      const updatedData = await updateResponse.json();
      if (!updateResponse.ok) throw new Error(updatedData.error);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const date = new Date();
  const day = date.toLocaleString("en-US", { day: "numeric" });
  const weekday = date.toLocaleString("en-US", { weekday: "short" });
  const month = date.toLocaleString("en-US", { month: "short" });

  const currentTimer = `${weekday} ${day} ${month}`;

  return (
    <React.Fragment>
      <div className={styles.heading}>
        <h3>Today</h3>
        <span>{currentTimer}</span>
      </div>
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

export const getServerSideProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://vikas:todos@cluster0.hkt90qy.mongodb.net/?retryWrites=true&w=majority&appName=todos"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");

  const todos = await todosCollection.find({ completed: false }).toArray();

  client.close();

  return {
    props: {
      todosList: todos.map((todo) => ({
        _id: todo._id.toString(),
        id: todo.id,
        completed: todo.completed,
        text: todo.text,
        description: todo.description,
      })),
    },
  };
};

export default Today;
