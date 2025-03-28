"use client";

import { useState } from 'react';
import TaskCard from './TaskCard';
import AddTask from './AddTask';
import { useTasks } from '../components/TaskContext';

interface Task {
  id: number | string;
  title: string;
  [key: string]: any;
}

interface ColumnProps {
  title: string; 
  tasks: Task[];
}

const Column = ({ title: initialTitle, tasks: initialTasks }: ColumnProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isEditStatusesModalOpen, setIsEditStatusesModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(initialTitle);
  const [newStatus, setNewStatus] = useState('');
  const { tasks, renameColumn, addColumn } = useTasks();

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

  const { color, icon } = getIconAndColor(initialTitle);

  const handleRename = () => {
    if (newTitle.trim() && newTitle !== initialTitle) {
      renameColumn(initialTitle, newTitle.toUpperCase());
      setIsRenameModalOpen(false);
    }
  };

  const handleAddStatus = () => {
    if (newStatus.trim() && !Object.keys(tasks).includes(newStatus.toUpperCase())) {
      addColumn(newStatus.toUpperCase());
      setNewStatus('');
    }
  };

  const handleRemoveStatus = (status: string) => {
    if (Object.keys(tasks).length > 1) { 
      renameColumn(status);
    }
  };

  // استخدام المهام من TaskContext مباشرة
  const columnTasks = tasks[initialTitle] || initialTasks;

  return (
    <div className="bg-gray-800 rounded-lg p-4 w-64 flex-shrink-0 relative h-48">
      <div className="flex items-center space-x-2 mb-4">
        <span className={`w-6 h-6 rounded-full ${color} flex items-center justify-center text-white text-xs`}>
          {icon}
        </span>
        <h2 className="text-white font-semibold text-sm">{initialTitle}</h2>
        <span className="text-gray-500 text-xs">({columnTasks.length})</span>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-gray-400 hover:text-white ml-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01" />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-10">
          <ul className="py-1">
            <li>
              <button
                onClick={() => {
                  setIsRenameModalOpen(true);
                  setIsDropdownOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Rename
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsEditStatusesModalOpen(true);
                  setIsDropdownOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Edit statuses
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Rename Modal */}
      {isRenameModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsRenameModalOpen(false);
          }}
        >
          <div className="bg-gray-800 rounded-lg p-4 w-80 border border-purple-600 shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <h2 className="text-white font-semibold text-sm">Rename Column</h2>
              <button
                onClick={() => setIsRenameModalOpen(false)}
                className="text-gray-400 hover:text-white ml-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter new column name"
              className="w-full p-2 mb-3 rounded bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <button
              onClick={handleRename}
              className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 flex items-center space-x-1 text-sm"
            >
              <span>Save</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Edit Statuses Modal */}
      {isEditStatusesModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEditStatusesModalOpen(false);
          }}
        >
          <div className="bg-gray-800 rounded-lg p-4 w-80 border border-purple-600 shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <h2 className="text-white font-semibold text-sm">Edit Statuses</h2>
              <button
                onClick={() => setIsEditStatusesModalOpen(false)}
                className="text-gray-400 hover:text-white ml-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                placeholder="Add new status"
                className="w-full p-2 rounded bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <button
                onClick={handleAddStatus}
                className="mt-2 bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 text-sm"
              >
                Add Status
              </button>
            </div>
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {Object.keys(tasks).map((status) => (
                <li key={status} className="flex items-center justify-between text-white text-sm">
                  <span>{status}</span>
                  <button
                    onClick={() => handleRemoveStatus(status)}
                    className="text-red-500 hover:text-red-700"
                    disabled={Object.keys(tasks).length <= 1}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-2">
        {columnTasks.map((task, index) => (
          <TaskCard key={task.id || index} task={task} index={index} column={initialTitle} />
        ))}
      </div>
      <div className="mt-2">
        <AddTask column={initialTitle} />
      </div>
    </div>
  );
};

export default Column;