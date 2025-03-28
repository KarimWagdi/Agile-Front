"use client"; 

import { useState } from "react";
import { Plus, User, Calendar, Flag, Trash, Edit } from "lucide-react";

interface Task {
  id: number;
  title: string;
  assignedTo?: string;
  dueDate?: string;
  priority?: string;
}

export default function UserStoryBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Task 1" },
    { id: 2, title: "Task 2" },
    { id: 3, title: "Task 3" },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  // Add Task
  const addTask = () => {
    const newTask: Task = { id: tasks.length + 1, title: `Task ${tasks.length + 1}` };
    setTasks([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Edit Task
  const startEditing = (id: number, title: string) => {
    setEditingId(id);
    setEditText(title);
  };

  const saveEdit = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, title: editText } : task)));
    setEditingId(null);
  };

  return (
    <div className="w-72 p-4 bg-white border border-gray-300 rounded-lg shadow">
      <div className="flex items-center justify-between text-black font-bold mb-3">
        <h3 className="text-lg">User Story</h3>
        <span className="text-sm">{tasks.length}</span>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="bg-gray-100 p-2 rounded-md flex justify-between items-center text-black transition hover:bg-gray-200">
            {editingId === task.id ? (
              <input 
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-grow px-2 py-1 border rounded"
                onBlur={() => saveEdit(task.id)}
                autoFocus
              />
            ) : (
              <span onClick={() => startEditing(task.id, task.title)} className="cursor-pointer flex-grow">{task.title}</span>
            )}

            <div className="flex gap-2 text-gray-600">
              <User size={16} className="cursor-pointer hover:text-blue-500" />
              <Calendar size={16} className="cursor-pointer hover:text-green-500" />
              <Flag size={16} className="cursor-pointer hover:text-red-500" />
              <Edit size={16} className="cursor-pointer hover:text-yellow-500" onClick={() => startEditing(task.id, task.title)} />
              <Trash size={16} className="cursor-pointer hover:text-red-600" onClick={() => deleteTask(task.id)} />
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={addTask} 
        className="mt-3 w-full flex items-center justify-center gap-2 py-2 border border-gray-400 rounded bg-gray-100 text-black hover:bg-gray-300 transition"
      >
        <Plus size={16} /> Add Task
      </button>
    </div>
  );
}
