import TaskStatus from "@/app/components/taskStatus";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-8">
      <TaskStatus />
    </div>
  );
}
