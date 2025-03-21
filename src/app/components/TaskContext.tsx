"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface Task {
  id?: number | string;
  title?: string;
  name?: string;
  assignee?: string;
  startDate?: string;
  endDate?: string;
  priority?: string;
  [key: string]: any;
}

interface TaskContextType {
  tasks: { [key: string]: Task[] };
  addTask: (column: string, taskName: string) => void;
  moveTask: (fromColumn: string, toColumn: string, taskIndex: number) => void;
  addColumn: (columnName: string) => void;
  renameColumn: (oldName: string, newName: string) => void;
  removeColumn: (columnName: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    'TO DO': [],
    'IN PROGRESS': [],
    'BACKLOG': [],
    'COMPLETE': [],
  });

  const addTask = (column: string, taskName: string) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: [...(prevTasks[column] || []), { name: taskName, id: Date.now() }],
    }));
  };

  const moveTask = (fromColumn: string, toColumn: string, taskIndex: number) => {
    setTasks((prevTasks) => {
      const taskToMove = prevTasks[fromColumn][taskIndex];
      const newFromTasks = prevTasks[fromColumn].filter((_, index) => index !== taskIndex);
      const newToTasks = [...(prevTasks[toColumn] || []), taskToMove];
      return {
        ...prevTasks,
        [fromColumn]: newFromTasks,
        [toColumn]: newToTasks,
      };
    });
  };

  const addColumn = (columnName: string) => {
    if (!tasks[columnName]) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [columnName]: [],
      }));
    }
  };

  const renameColumn = (oldName: string, newName: string) => {
    if (oldName !== newName && !tasks[newName]) {
      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };
        newTasks[newName] = newTasks[oldName];
        delete newTasks[oldName];
        return newTasks;
      });
    }
  };

  const removeColumn = (columnName: string) => {
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      delete newTasks[columnName];
      return newTasks;
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, moveTask, addColumn, renameColumn, removeColumn }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};