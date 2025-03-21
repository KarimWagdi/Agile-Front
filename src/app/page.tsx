import Board from './components/Board';
import Navbar from './components/Navbar';
import { TaskProvider } from './components/TaskContext';

export default function Home() {
  return (
    <TaskProvider>
      <div className="bg-gray-900">
        <Navbar />
        <Board />
      </div>
    </TaskProvider>
  );
}