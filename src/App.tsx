import styles from "./App.module.css";
import {Header} from "./Header/Header.tsx";
import {Input} from "./Input/Input.tsx";
import {List} from "./List/List.tsx";
import {useEffect, useState} from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Task {
  id: number;
  content: string;
  completed: boolean;
}

interface Toast {
  message: string;
  data: {
    title: string;
    text: string
  },
  type: 'success' | 'warning' | 'error'
}

const STORAGE_TASKS_KEY = 'tasks'

function App() {
  const showToast = ({ message, data, type }: Toast) => {
    toast[type](message, {
      data: {
        ...data
      }
    });
  };

  const [tasks, setTasks] = useState<Task[]>([])
  const [completedCount, setcompletedCount] = useState<number>(0)

  useEffect(() => {
    const storageTasks = JSON.parse(localStorage.getItem(STORAGE_TASKS_KEY) ?? '[]')
    setTasks(storageTasks)
  }, [])

  function addTask(value: string) {
    const maxId = tasks.length === 0
      ? 0
      : Math.max(...tasks.map(task => task.id))
    const newTask: Task = {
      id: maxId+1,
      content: value,
      completed: false
    }
    const updatedList = [...tasks, newTask]
    setTasks(updatedList)
    saveItemsInLocalStorage(updatedList)
    updateCompletedCount()

    showToast({
      message: 'Nova tarefa adicionada com sucesso!',
      data: {
        title: 'Nova Tarefa',
        text: ''
      },
      type: 'success'
    })
  }

  function updateTask(id: number, completed: boolean) {
    const task: Task = tasks.find(task => task.id === id) as Task
    task.completed = completed
    setTasks(tasks)
    saveItemsInLocalStorage(tasks)
    updateCompletedCount()

    if(task.completed) {
      showToast({
        message: `Tarefa "${task.content}" completa!`,
        data: {
          title: '',
          text: ''
        },
        type: 'success'
      })
    }
  }

  function deleteTask(id: number) {
    const task: Task = (tasks.find(task => task.id === id) as Task)
    const newList = tasks.filter(task => task.id !== id)
    setTasks(newList)
    saveItemsInLocalStorage(newList)

    showToast({
      message:`Tarefa "${task.content}" removida da lista!` ,
      data: {
        title: '',
        text: ''
      },
      type: 'success'
    })
  }

  function updateCompletedCount() {
    setcompletedCount(tasks.filter(task => task.completed).length)
  }

  function saveItemsInLocalStorage(updatedList: Task[]) {
    localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(updatedList))
  }

  return (
    <div className={styles.main}>
      <Header />
      <Input
        type="text"
        name="newTask"
        placeholder="Adicione uma nova tarefa"
        onAddTask={addTask} />
      <List
        tasks={tasks}
        completedCount={completedCount}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
      <ToastContainer />
    </div>
  )
}

export default App
