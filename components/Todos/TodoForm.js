"use client";

import React, { useRef, useState } from "react";
import styles from "./TodoForm.module.css";

const TodoForm = (props) => {
  const [active, setActive] = useState(false);

  const enteredTextRef = useRef();
  const enteredDescriptionRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const text = enteredTextRef.current.value;
    const description = enteredDescriptionRef.current.value;
    props.onAddTask({
      id: text,
      text,
      description,
    });
    setActive(false);
    enteredTextRef.current.value = "";
    enteredDescriptionRef.current.value = "";
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
