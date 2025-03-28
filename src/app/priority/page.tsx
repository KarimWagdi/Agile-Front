"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PriorityPage() {
  const [selectedPriority, setSelectedPriority] = useState('');
  const router = useRouter();

  const priorities = [
    { id: 1, name: 'High', color: 'bg-red-500' },
    { id: 2, name: 'Medium', color: 'bg-yellow-500' },
    { id: 3, name: 'Low', color: 'bg-green-500' },
  ];

  const handleSave = () => {
    if (selectedPriority) {
      
      console.log('Selected Priority:', selectedPriority);
      router.back(); 
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add Priority</h1>
      <div className="mb-4">
        <label htmlFor="priority" className="block text-sm font-medium mb-2">
          Select Priority
        </label>
        <select
          id="priority"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        >
          <option value="" disabled>
            Choose a priority
          </option>
          {priorities.map((priority) => (
            <option key={priority.id} value={priority.name}>
              {priority.name}
            </option>
          ))}
        </select>
        {selectedPriority && (
          <div className="mt-2 flex items-center space-x-2">
            <span
              className={`w-4 h-4 rounded-full ${
                priorities.find((p) => p.name === selectedPriority)?.color
              }`}
            ></span>
            <span>{selectedPriority}</span>
          </div>
        )}
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