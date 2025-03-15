"use client";
import { useState } from "react";

export default function Project() {
  const [step, setStep] = useState(1);
  const [project, setProject] = useState({ name: "", description: "", private: false });
  const [selectedSolution, setSelectedSolution] = useState("");
  const [error, setError] = useState("");

  const solutions = [
    "Starter",
    "Marketing Teams",
    "Project Management",
    "Product + Engineering",
  ];

  const handleNext = () => {
    if (!selectedSolution) {
      setError("Please select a pre-configured solution.");
      return;
    }
    setStep(2);
  };

  const handleCreateProject = () => {
    if (!project.name.trim()) {
      setError("Project name is required!");
      return;
    }
    alert(`✅ Project "${project.name}" Created!`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        {step === 1 ? (
          <>
            <h1 className="text-3xl font-bold text-black mb-6">Define Your Workflow</h1>
            <p className="text-gray-700 mb-6 text-lg">
              Choose a pre-configured solution for your project.
            </p>

            {/* Workflow Selection */}
            <div className="grid grid-cols-2 gap-4">
              {solutions.map((option) => (
                <button
                  key={option}
                  className={`p-4 border-2 rounded-lg text-lg font-medium transition ${
                    selectedSolution === option
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-gray-100 text-black border-gray-400 hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => {
                    setSelectedSolution(option);
                    setError("");
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Next Button */}
            <button
              className="mt-8 w-full bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition"
              onClick={handleNext}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-black mb-6">Create a Project</h1>
            <p className="text-gray-700 mb-6 text-lg">
              A project represents a team, department, or group with its own workflows and settings.
            </p>

            {/* Project Form */}
            <div>
              <label className="block text-xl font-medium text-black">Project Name</label>
              <input
                type="text"
                className="w-full p-4 border-2 rounded-lg mt-2 text-lg text-black bg-gray-100 border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Marketing, Engineering, HR"
                value={project.name}
                onChange={(e) => {
                  setProject({ ...project, name: e.target.value });
                  setError("");
                }}
              />
              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            </div>

            <div className="mt-6">
              <label className="block text-xl font-medium text-black">Description (Optional)</label>
              <textarea
                className="w-full p-4 border-2 rounded-lg mt-2 text-lg text-black bg-gray-100 border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Describe this project..."
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
              ></textarea>
            </div>

            {/* Privacy Toggle */}
            <div className="mt-6 flex items-center">
              <input
                type="checkbox"
                checked={project.private}
                onChange={(e) => setProject({ ...project, private: e.target.checked })}
                className="mr-3 w-6 h-6 text-blue-600 border-2 border-gray-400 rounded"
              />
              <span className="text-lg text-black">Make Private (Only invited members can access)</span>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                className="bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-500 transition"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition"
                onClick={handleCreateProject}
              >
                Create Project
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
