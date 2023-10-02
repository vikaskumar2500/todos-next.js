"use client";

import React, { useState } from "react";
import styles from "./TodayTodoItem.module.css";
import { IconButton } from "@mui/material";
import {
  DeleteOutline,
  RadioButtonUncheckedOutlined,
  TaskAltOutlined,
} from "@mui/icons-material";

const TodayTodoItem = (props) => {
  const [isComplete, setIsComplete] = useState(false);
  const { _id, id, text, description } = props;

  const deleteButtonHelper = (id) => {
    props.onDeleteButton(id);
  };
  const completedTaskHandler = (id) => {
    props.onComplete({
      _id,
      id,
      completed: true,
      text,
      description,
    });
  };
  return (
    <div key={id} className={styles.item}>
      <div className={styles["item-left"]}>
        <IconButton
          className={styles.icon}
          onClick={completedTaskHandler.bind(null, id)}
          onMouseOverCapture={() => setIsComplete(true)}
          onMouseOutCapture={() => setIsComplete(false)}
        >
          {!isComplete && <RadioButtonUncheckedOutlined />}
          {isComplete && <TaskAltOutlined />}
        </IconButton>
        <div>{text}</div>
      </div>
      <IconButton
        className={styles.delete}
        onClick={deleteButtonHelper.bind(null, id)}
      >
        <DeleteOutline />
      </IconButton>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default TodayTodoItem;
