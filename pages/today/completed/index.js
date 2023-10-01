"use client";

import React, { useState } from "react";
import CompletedTodoList from "../../../components/Todos/CompletedTodoList";
import { MongoClient } from "mongodb";

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
    <React.Fragment>
      <h3 style={{ marginLeft: "14px", opacity: "0.6", color: "blueviolet" }}>
        Completed Task
      </h3>
      <CompletedTodoList
        onComplete={completedTaskHandler}
        completed={completedTask}
      />
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
