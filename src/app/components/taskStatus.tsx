"use client"
import React, { useState } from "react";

type Status = "pending" | "in_progress" | "completed" | "on_hold" | "canceled";

type Task = {
  id: string;
  title: string;
  status: Status;
};

const statusColors: Record<Status, string> = {
  pending: "bg-yellow-200 text-yellow-700 border-yellow-500", 
  in_progress: "bg-blue-200 text-blue-700 border-blue-500", 
  completed: "bg-green-200 text-green-700 border-green-500", 
  on_hold: "bg-gray-300 text-gray-700 border-gray-500", 
  canceled: "bg-red-200 text-red-700 border-red-500", 
};

export default function TaskStatus() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Design UI", status: "pending" },
    { id: "2", title: "Develop Backend", status: "in_progress" },
    { id: "3", title: "Testing Features", status: "on_hold" },
    { id: "4", title: "Deploy to Production", status: "completed" },
    { id: "5", title: "Remove Unused Code", status: "canceled" },
  ]);

  const columns = [
    { id: "pending", title: "Pending" },
    { id: "in_progress", title: "In Progress" },
    { id: "completed", title: "Completed" },
    { id: "on_hold", title: "On Hold" },
    { id: "canceled", title: "Canceled" },
  ];

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, taskId: string) => {
    event.dataTransfer.setData("taskId", taskId);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, newStatus: Status) => {
    const taskId = event.dataTransfer.getData("taskId");
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
      {columns.map((col) => (
        <div
          key={col.id}
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, col.id as Status)}
          className="w-full bg-white p-4 rounded-xl shadow-md border border-gray-300 min-h-[250px] flex flex-col"
        >
          <h2 className="text-lg font-semibold mb-3 text-gray-700">{col.title}</h2>
          <div className="flex flex-col gap-2">
            {tasks
              .filter((t) => t.status === col.id)
              .map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className={`p-3 rounded-lg shadow-sm border ${statusColors[task.status]} cursor-pointer transition-transform transform hover:scale-105`}
                >
                  {task.title}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
