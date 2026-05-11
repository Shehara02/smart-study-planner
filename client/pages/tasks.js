// pages/tasks.js
// Task management page

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import Button from '../components/Button';
import ProtectedRoute from '../lib/ProtectedRoute';
import { taskAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState('all'); // all, completed, pending

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks();
      setTasks(response.data.data);
    } catch (error) {
      toast.error('Failed to load tasks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks based on completion status
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  // Handle task creation
  const handleCreateTask = async (formData) => {
    try {
      const response = await taskAPI.createTask(formData);
      setTasks([response.data.data, ...tasks]);
      setIsModalOpen(false);
      fetchTasks(); // Refresh to get updated stats
    } catch (error) {
      throw error;
    }
  };

  // Handle task update
  const handleUpdateTask = async (formData) => {
    try {
      const response = await taskAPI.updateTask(selectedTask.id, formData);
      setTasks(tasks.map((t) => (t.id === selectedTask.id ? response.data.data : t)));
      setIsModalOpen(false);
      setSelectedTask(null);
      fetchTasks(); // Refresh to get updated stats
    } catch (error) {
      throw error;
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskAPI.deleteTask(taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
      toast.success('Task deleted successfully!');
      fetchTasks(); // Refresh to get updated stats
    } catch (error) {
      toast.error('Failed to delete task');
      console.error(error);
    }
  };

  // Handle task completion toggle
  const handleToggleComplete = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      const response = await taskAPI.updateTask(taskId, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t.id === taskId ? response.data.data : t)));
      toast.success(
        !task.completed ? 'Task marked as completed!' : 'Task marked as pending!'
      );
      fetchTasks(); // Refresh to get updated stats
    } catch (error) {
      toast.error('Failed to update task');
      console.error(error);
    }
  };

  // Handle task edit
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <>
      <Head>
        <title>Tasks - Smart Study Planner</title>
      </Head>

      <ProtectedRoute>
        <Layout>
          {/* Page Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                ✅ My Tasks
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage and track your study tasks
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Task</span>
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { label: 'All Tasks', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'Completed', value: 'completed' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === item.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Tasks List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <EmptyState
              icon="📋"
              title={filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
              description={
                filter === 'all'
                  ? 'Create your first task to get started'
                  : `You don't have any ${filter} tasks`
              }
              action={filter === 'all' ? 'Create Task' : undefined}
            />
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </div>
          )}

          {/* Task Form Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={selectedTask ? 'Edit Task' : 'Create New Task'}
            size="lg"
          >
            <TaskForm
              task={selectedTask}
              onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
              onCancel={handleCloseModal}
            />
          </Modal>
        </Layout>
      </ProtectedRoute>
    </>
  );
}
