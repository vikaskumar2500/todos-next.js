"use client";
import React, { useState } from "react";
import TodayTodoList from "../../components/Todos/TodayTodoList";
import TodoForm from "../../components/Todos/TodoForm";
import { Add } from "@mui/icons-material";
import styles from "./index.module.css";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";

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
    setData((prev) => [...prev, enteredFormData]);
    try {
      const response = await fetch("/api/today", {
        method: "POST",
        body: JSON.stringify(enteredFormData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const deleteButtonHelper = async (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    try {
      const response = await fetch(`/api/today?id=${id.toString()}`, {
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

  const completedTaskHandler = async (todo, id) => {
    setData((prev) => prev.filter((item) => item.id !== id));

    try {
      const deleteResponse = await fetch(`/api/today?id=${id.toString()}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const deteledData = await deleteResponse.json();
      if (!deleteResponse.ok) throw new Error(deteledData.error);

      const postResponse = await fetch("/api/today", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
      });

      const postedData = await postResponse.json();
      if (!postResponse.ok) throw new Error(data.error);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const date = new Date();
  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("en-US", { month: "short" });
  const weekday = date.toLocaleString("en-US", { weekday: "short" });

  const dateTimeStamp = `${weekday} ${day} ${month}`;

  return (
    <React.Fragment>
      <div className={styles.heading}>
        <h3>Today</h3>
        <span>{dateTimeStamp}</span>
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

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://vikas:todos@cluster0.hkt90qy.mongodb.net/?retryWrites=true&w=majority&appName=todos"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");

  const todos = await todosCollection.find().toArray();

  client.close();

  const filteredTodos = todos.filter((todo) => todo.completed === false);

  return {
    props: {
      todosList: filteredTodos.map((todo) => ({
        id: todo._id.toString(),
        text: todo.text,
        description: todo.description,
      })),
      revalidate: 3,
    },
  };
};

export default Today;
