
import { useEffect, useState } from 'react';
import { TaskContext } from './TaskContextDefinition';
import { initialTasks } from '../data/tasks';

const STORAGE_KEY = 'focusboard_tasks';

function getStoredTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks !== null) {
      const parsedTasks = JSON.parse(savedTasks);

      if (Array.isArray(parsedTasks)) {
        return parsedTasks;
      }
    }
  } catch (error) {
    console.error('Unable to load tasks:', error);
  }

  return initialTasks;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(getStoredTasks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Unable to save tasks:', error);
    }
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description || '',
      category: taskData.category || 'Work',
      priority: taskData.priority || 'Medium',
      status: taskData.status || 'todo',
      dueDate: taskData.dueDate || '',
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const updateTask = (id, updatedData) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === 'completed' ? 'todo' : 'completed',
            }
          : task
      )
    );
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === 'completed'
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === 'in-progress'
  ).length;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        totalTasks,
        completedTasks,
        inProgressTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
