"use client";

import { useState } from 'react';
import { useTasks } from '../components/TaskContext'; 
import { useRouter } from 'next/navigation';

interface AddTaskProps {
  column: string; 
}

const AddTask = ({ column }: AddTaskProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const { addTask, tasks } = useTasks();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim() && addTask) { 
      addTask(column, taskName); 
      setTaskName(''); 
      setIsOpen(false); 
    }
  };

  const getIconAndColor = (title: string) => {
    switch (title) {
      case 'BACKLOG':
        return { color: 'bg-red-500', icon: '⏳' };
      case 'IN PROGRESS':
        return { color: 'bg-purple-500', icon: '🔄' };
      case 'COMPLETE':
        return { color: 'bg-green-500', icon: '✔️' };
      default:
        return { color: 'bg-gray-500', icon: '⚪' };
    }
  };

  const { color, icon } = getIconAndColor(column);

  // الحصول على عدد المهام في العمود الحالي
  const columnTasks = tasks[column] || [];
  const taskCount = columnTasks.length;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-1 text-gray-400 hover:text-white"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-sm">Add Task</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="bg-gray-800 rounded-lg p-4 w-80 border border-purple-600 shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <span className={`w-6 h-6 rounded-full ${color} flex items-center justify-center text-white text-xs`}>
                {icon}
              </span>
              <h2 className="text-white font-semibold text-sm">{column} ({taskCount})</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white ml-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task Name..."
                className="w-full p-2 mb-3 rounded bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <div className="space-y-2 mb-3">
                <button
                  type="button"
                  onClick={() => router.push('/assignee')}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Add assignee</span>
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/dates')}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Add dates</span>
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/priority')}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Add priority</span>
                </button>
              </div>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 flex items-center space-x-1 text-sm"
              >
                <span>Save</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTask;