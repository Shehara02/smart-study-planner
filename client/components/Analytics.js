import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { analyticsAPI } from '../services/api';
import { TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await analyticsAPI.getAnalytics();
      setAnalyticsData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No analytics data available</p>
      </div>
    );
  }

  const { summary, weeklyProductivity, dailyProductivity, studyHours, priorityBreakdown } = analyticsData;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Tasks Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Tasks</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {summary.totalTasks}
              </h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Completed</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {summary.totalCompleted}
              </h3>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        {/* Completion Rate Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Completion Rate</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {summary.completionRate}%
              </h3>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        {/* This Month Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border-l-4 border-amber-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">This Month</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {summary.completedThisMonth}
              </h3>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>

        {/* Study Hours Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border-l-4 border-red-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Study Hours</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {studyHours.total}h
              </h3>
            </div>
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Productivity Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Weekly Productivity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyProductivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar 
                dataKey="completed" 
                fill="#3b82f6" 
                radius={[8, 8, 0, 0]}
                name="Completed Tasks"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Study Hours Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Study Hours by Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={studyHours.byWeek}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value) => `${value}h`}
              />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 5 }}
                activeDot={{ r: 7 }}
                name="Study Hours"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Productivity Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Daily Productivity (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyProductivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar 
                dataKey="completed" 
                fill="#10b981" 
                radius={[8, 8, 0, 0]}
                name="Completed Tasks"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Breakdown Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 w-full">Priority Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Your Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Average Daily Completion</p>
            <p className="text-2xl font-bold text-blue-600">
              {(summary.totalCompleted / 7).toFixed(1)} tasks/day
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Pending Tasks</p>
            <p className="text-2xl font-bold text-amber-600">
              {summary.pendingTasks} tasks
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Average Study Hours/Week</p>
            <p className="text-2xl font-bold text-green-600">
              {(studyHours.total / 4).toFixed(1)}h/week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
