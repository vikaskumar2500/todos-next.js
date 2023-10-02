"use client";

import React, { useState } from "react";
import CompletedTodoList from "../../../components/Todos/CompletedTodoList";
import { MongoClient } from "mongodb";
import { TaskAltOutlined } from "@mui/icons-material";

const CompletedTodos = ({ completedTodos }) => {
  const [completedTask, setCompletedTask] = useState(completedTodos);

  const completedTaskHandler = async (id) => {
    setCompletedTask((prev) => prev.filter((todo) => todo.id !== id));
    try {
      const response = await fetch(`/api/today?id=${id}`, {
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
  return (
    <React.Fragment>
      <h3
        style={{
          marginLeft: "14px",
          opacity: "0.6",
          color: "blueviolet",
          display: "flex",
          alignItems: "center",
        }}
      >
        Completed Task <TaskAltOutlined />
      </h3>

      <CompletedTodoList
        onComplete={completedTaskHandler}
        completedTodos={completedTask}
      />
    </React.Fragment>
  );
};

export const getServerSideProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://vikas:todos@cluster0.hkt90qy.mongodb.net/?retryWrites=true&w=majority&appName=todos"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");

  const todos = await todosCollection.find({ completed: true }).toArray();

  client.close();

  return {
    props: {
      completedTodos: todos.map((todo) => ({
        _id: todo._id.toString(),
        id: todo.id,
        completed: todo.completed,
        text: todo.text,
        description: todo.description,
      })),
    },
  };
};

export default CompletedTodos;
