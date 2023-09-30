import React from "react";
import CompletedTodoItem from "./CompletedTodoItem";

const CompletedTodoList = ({ completed, onComplete }) => {
  return (
    <div>
      {completed.map((completedItem) => (
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
