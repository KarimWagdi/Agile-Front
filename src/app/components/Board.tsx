"use client";

import { useState } from 'react';
import Column from './Column';
import { useTasks } from '../components/TaskContext';

const Board = () => {
  const { tasks, addColumn } = useTasks();
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGroupName.trim() && tasks && !tasks[newGroupName.toUpperCase()]) {
      addColumn(newGroupName.toUpperCase());
      setNewGroupName('');
      setIsAddGroupOpen(false);
    }
  };

  // Ensure tasks is defined before mapping
  const columns = tasks ? Object.keys(tasks) : [];

  return (
    <div className="flex gap-4 p-4 bg-gray-900 min-h-screen">
      {columns.map((column) => (
        <Column key={column} title={column} tasks={tasks[column]} />
      ))}
      <div className="flex items-start">
        <button
          onClick={() => setIsAddGroupOpen(true)}
          className="text-gray-400 hover:text-white flex items-center space-x-1 p-4"
        >
          <span>+ Add group</span>
        </button>
      </div>

      {isAddGroupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddGroupOpen(false);
          }}
        >
          <div className="bg-gray-800 rounded-lg p-4 w-80 border border-purple-600 shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <h2 className="text-white font-semibold text-sm">Add New Group</h2>
              <button
                onClick={() => setIsAddGroupOpen(false)}
                className="text-gray-400 hover:text-white ml-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddGroup}>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Group Name..."
                className="w-full p-2 mb-3 rounded bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 flex items-center space-x-1 text-sm"
              >
                <span>Add</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;