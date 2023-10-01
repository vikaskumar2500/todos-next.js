"use client";

import React, { useState } from "react";
import CompletedTodoList from "../../../components/Todos/CompletedTodoList";
import { MongoClient } from "mongodb";

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

const CompletedTodos = ({ completedTodos }) => {
  const [completedTask, setCompletedTask] = useState(completedTodos);
  const completedTaskHandler = async (id) => {
    setCompletedTask((prev) => prev.filter((todo) => todo.id !== id));
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
  return (
    <CompletedTodoList
      onComplete={completedTaskHandler}
      completed={completedTask}
    />
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

  const filteredTodos = todos.filter((todo) => todo.completed === true);

  return {
    props: {
      completedTodos: filteredTodos.map((todo) => ({
        id: todo._id.toString(),
        text: todo.text,
        description: todo.description,
      })),
      revalidate: 1,
    },
  };
};

export default CompletedTodos;
