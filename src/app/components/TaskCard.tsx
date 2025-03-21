import { useTasks } from '../components/TaskContext';

interface TaskCardProps {
  task: any;
  index: number;
  column: 'TO DO' | 'IN PROGRESS' | 'BACKLOG' | 'COMPLETE';
}

const TaskCard = ({ task, index, column }: TaskCardProps) => {
  const taskContext = useTasks();
  if (!taskContext) {
    return null;
  }
  const { moveTask } = taskContext;

  const handleMove = (toColumn: 'TO DO' | 'IN PROGRESS' | 'BACKLOG' | 'COMPLETE') => {
    moveTask(column, toColumn, index);
  };

  return (
    <div className="bg-white text-black p-3 rounded-lg shadow">
      <p>{task}</p>
      <div className="flex space-x-2 mt-2">
        {column !== 'TO DO' && (
          <button
            onClick={() => handleMove('TO DO')}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            To Do
          </button>
        )}
        {column !== 'IN PROGRESS' && (
          <button
            onClick={() => handleMove('IN PROGRESS')}
            className="text-purple-600 hover:text-purple-800 text-sm"
          >
            In Progress
          </button>
        )}
        {column !== 'BACKLOG' && (
          <button
            onClick={() => handleMove('BACKLOG')}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Backlog
          </button>
        )}
        {column !== 'COMPLETE' && (
          <button
            onClick={() => handleMove('COMPLETE')}
            className="text-green-600 hover:text-green-800 text-sm"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;