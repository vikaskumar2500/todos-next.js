import React from "react";
import CompletedTodoItem from "./CompletedTodoItem";

const CompletedTodoList = ({ completedTodos, onComplete }) => {
  return (
    <div>
      {completedTodos.map((completedItem) => (
        <CompletedTodoItem
          onComplete={onComplete}
          key={completedItem.id}
          {...completedItem}
        />
      ))}
    </div>
  );
};

export default CompletedTodoList;
