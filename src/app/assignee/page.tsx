"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AssigneePage() {
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const router = useRouter();

  const assignees = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alex Johnson' },
    { id: 4, name: 'Sarah Williams' },
  ];

  const handleSave = () => {
    if (selectedAssignee) {
      console.log('Selected Assignee:', selectedAssignee);
      router.back(); 
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add Assignee</h1>
      <div className="mb-4">
        <label htmlFor="assignee" className="block text-sm font-medium mb-2">
          Select Assignee
        </label>
        <select
          id="assignee"
          value={selectedAssignee}
          onChange={(e) => setSelectedAssignee(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        >
          <option value="" disabled>
            Choose an assignee
          </option>
          {assignees.map((assignee) => (
            <option key={assignee.id} value={assignee.name}>
              {assignee.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleSave}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center space-x-1 text-sm"
        >
          <span>Save</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
        <button
          onClick={() => router.back()}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}