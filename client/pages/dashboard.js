// pages/dashboard.js
// User dashboard page with statistics

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import ProtectedRoute from '../lib/ProtectedRoute';
import { taskAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch statistics on mount
  useEffect(() => {
    fetchStats();
  }, []);

  // Fetch task statistics
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      toast.error('Failed to load statistics');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard - Smart Study Planner</title>
      </Head>

      <ProtectedRoute>
        <Layout>
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              📊 Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here's an overview of your study progress
            </p>
          </div>

          {/* Statistics Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading statistics...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Total Tasks */}
              <StatCard
                icon="✅"
                label="Total Tasks"
                value={stats.totalTasks}
                color="blue"
              />

              {/* Completed Tasks */}
              <StatCard
                icon="🎉"
                label="Completed Tasks"
                value={stats.completedTasks}
                color="green"
              />

              {/* Pending Tasks */}
              <StatCard
                icon="⏳"
                label="Pending Tasks"
                value={stats.pendingTasks}
                color="yellow"
              />
            </div>
          )}

          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Smart Study Planner!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Organize your tasks, set priorities, and track your progress. Start by creating your first task to begin your journey towards better study habits.
            </p>
          </div>

          {/* Quick Tips */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tip 1 */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                💡 Pro Tip: Set Priorities
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Mark your tasks with priority levels (High, Medium, Low) to focus on what matters most.
              </p>
            </div>

            {/* Tip 2 */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                ⏰ Set Deadlines
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add deadlines to your tasks to stay organized and meet your study goals on time.
              </p>
            </div>

            {/* Tip 3 */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                ✨ Track Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Mark tasks as complete to track your progress and celebrate your achievements.
              </p>
            </div>

            {/* Tip 4 */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🌙 Dark Mode
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Toggle dark mode in the header to make study sessions more comfortable.
              </p>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    </>
  );
}
