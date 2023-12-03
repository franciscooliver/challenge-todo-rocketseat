import styles from "./Input.module.css";
import { PlusCircle} from "@phosphor-icons/react";
import React, {ChangeEvent, useRef, useState} from "react";

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement> {
  onAddTask: (value: string) => void
}

export function Input({ onAddTask, ...rest }: InputProps) {
  const [taskText, setTaskText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChangeTaskText(event: ChangeEvent<HTMLInputElement>) {
    setTaskText(event.target.value)
  }

  function handleClickAddTask() {
    if (!taskText) return
    onAddTask(taskText)
    setTaskText('')
    inputRef.current?.focus()
  }

  return (
    <div className={styles.inputContainer}>
      <input
        ref={inputRef}
        value={taskText}
        onChange={handleChangeTaskText}
        {...rest}
      />
      <button type="button"
        onClick={handleClickAddTask}
      >
        Criar
        <PlusCircle size={16} fontWeight={700}/>
      </button>
    </div>
  );
}