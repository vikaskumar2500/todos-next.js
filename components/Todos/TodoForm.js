"use client";

import React, { useRef, useState } from "react";
import styles from "./TodoForm.module.css";
import { v4 as uuidv4 } from "uuid";

const TodoForm = (props) => {
  const [active, setActive] = useState(false);

  const enteredTextRef = useRef();
  const enteredDescriptionRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const text = enteredTextRef.current.value;
    const description = enteredDescriptionRef.current.value;

    const enteredFormData = {
      id: uuidv4(),
      completed: false,
      text,
      description,
    };

    props.onAddTask(enteredFormData);

    enteredTextRef.current.value = "";
    enteredDescriptionRef.current.value = "";
    setActive(false);
  };
  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <input
        type="text"
        id="text"
        name="text"
        placeholder="text name"
        ref={enteredTextRef}
        onChange={(e) => {
          if (e.target.value.length > 0) setActive(true);
          else setActive(false);
        }}
      />
      <input
        type="text"
        id="description"
        name="description"
        minLength={6}
        placeholder="Description"
        ref={enteredDescriptionRef}
      />
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles["cancel-button"]}
          onClick={() => {
            props.onCloseButton();
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles[active ? "active" : "add-button"]}
          disabled={active ? false : true}
        >
          Add task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
