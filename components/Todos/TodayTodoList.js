import React from "react";
import TodayTodoItem from "./TodayTodoItem";

const TodayTodoList = ({ todos, onDeleteButton, onComplete }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodayTodoItem
          onComplete={onComplete}
          onDeleteButton={onDeleteButton}
          key={todo.id}
          {...todo}
        />
      ))}
    </div>
  );
};

export default TodayTodoList;
