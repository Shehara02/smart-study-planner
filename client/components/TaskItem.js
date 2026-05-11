// TaskItem Component
// Component for displaying individual task

import { Trash2, Edit2, CheckCircle2, Circle } from 'lucide-react';

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  const getPriorityColor = (priority) => {
    const colors = {
      HIGH: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
      MEDIUM: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20',
      LOW: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
    };
    return colors[priority] || colors.MEDIUM;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      className={`flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-slate-800 ${
        task.completed
          ? 'bg-gray-50 dark:bg-slate-800/50'
          : 'bg-white dark:bg-slate-900 hover:shadow-md transition-shadow'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggleComplete(task.id)}
        className="mt-1 flex-shrink-0 focus:outline-none"
      >
        {task.completed ? (
          <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
        ) : (
          <Circle className="w-6 h-6 text-gray-400 dark:text-gray-600 hover:text-blue-500" />
        )}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={`font-semibold text-base ${
            task.completed
              ? 'line-through text-gray-500 dark:text-gray-400'
              : 'text-gray-900 dark:text-white'
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {task.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-3">
          {/* Priority Badge */}
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          {/* Deadline */}
          <span className="text-xs text-gray-600 dark:text-gray-400 px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full">
            📅 {formatDate(task.deadline)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
