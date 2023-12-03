import styles from './List.module.css'

import {Trash} from "@phosphor-icons/react";
import {Task} from "../App.tsx";
import {ChangeEvent} from "react";
import {Empty} from "./Empty.tsx";

interface ListProps {
  tasks: Task[];
  completedCount: number;
  onUpdateTask: (id: number, completed: boolean) => void;
  onDeleteTask: (id: number) => void;
}
export function List({tasks, completedCount, onUpdateTask, onDeleteTask}: ListProps) {
  function handleChangeCompletedtask(event: ChangeEvent<HTMLInputElement>, id: number) {
    onUpdateTask(id, event.target.checked)
  }

  function handleClickRemoveTask(id: number) {
    onDeleteTask(id)
  }

    return tasks.length
      ? (
        <div className={styles.list}>
          <div className={styles.countText}>
            <div className={styles.created}>
              Tarefas criadas
              <div className={styles.counter}>
                {tasks.length}
              </div>
            </div>

            <div className={completedCount === 0 ? styles.completed : styles.completed + ' ' +styles.doneWithQtd}>
              Concluídas
              <div className={styles.counter}>
                {completedCount} de { tasks.length }
              </div>
            </div>
          </div>

          <div className={styles.listItems}>
            {
              tasks.map(task => {
                return (
                  <div className={styles.taskItem} key={task.id}>
                    <label className={styles.inputContainer}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={
                          (e) => handleChangeCompletedtask(e, task.id)
                        }
                      />
                      <span className={styles.checkmark}></span>
                    </label>
                    {
                      task.completed
                        ? <del><p className={styles.completed}>{task.content}</p></del>
                        : <p>{task.content}</p>
                    }
                    <button
                      onClick={() => handleClickRemoveTask(task.id)}>
                      <Trash size={12}/>
                    </button>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
      : (
        <Empty />
      );
}