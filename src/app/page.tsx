import Board from './components/Board';
import Navbar from './components/Navbar';
import { TaskProvider } from './components/TaskContext';
import TaskStatus from "@/app/components/taskStatus";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <TaskStatus />
      {/* أزرار تسجيل الدخول والتسجيل في أعلى الصفحة على اليسار */}
      <div className="absolute top-4 left-4 flex gap-4">
        <Link
          href="/login"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-green-600 text-white hover:bg-green-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Sign Up
        </Link>
      </div>
      <TaskProvider>
      <div className="bg-gray-900">
        <Navbar />
        <Board />
      </div>
    </TaskProvider>
      {/* محتوى الصفحة */}
      <main className="flex flex-col gap-8 items-center sm:items-start justify-center h-full">
        <h1 className="text-2xl font-bold">Welcome to Our Platform</h1>
        <p className="text-gray-600">Choose an option above to get started.</p>
      </main>
      <footer></footer>
    </div>
  );
}