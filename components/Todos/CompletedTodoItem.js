import {
  DeleteOutline,
  RadioButtonCheckedOutlined,
  TaskAltOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import styles from "./CompletedTodoItem.module.css";

const CompletedTodoItem = (props) => {
  const { _id, id, text, description, onComplete } = props;

  const deleteButtonHelper = (id) => {
    onComplete(id);
  };
  return (
    <div key={_id} className={styles.complete} title="Completed Task">
      <div className={styles["complete-left"]}>
        <IconButton className={styles.icon}>
          <TaskAltOutlined />
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

export default CompletedTodoItem;
