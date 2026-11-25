import { createContext, useContext, useReducer } from "react";
import { taskReducer, initialTasks } from "./taskReducer";

const TaskContext = createContext();

export function TaskProvider({ children, initialData = initialTasks }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialData);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  const updateTask = (taskData) => {
    dispatch({ type: "UPDATE_TASK", payload: taskData });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const changeTaskStatus = (id, estado) => {
    dispatch({ type: "CHANGE_STATUS", payload: { id, estado } });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        changeTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks debe usarse dentro de un TaskProvider");
  }
  return context;
}