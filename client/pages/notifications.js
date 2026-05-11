import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Notifications from '../components/Notifications';
import ProtectedRoute from '../lib/ProtectedRoute';

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Notifications - Smart Study Planner</title>
        <meta name="description" content="View task reminders, upcoming deadlines, and overdue tasks" />
      </Head>

      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">🔔 Notifications</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              View reminders for upcoming deadlines and overdue tasks
            </p>
          </div>

          <Notifications />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
