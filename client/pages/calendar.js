// pages/calendar.js
// Calendar view for tasks with deadlines

import { useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Calendar from '../components/Calendar';
import ProtectedRoute from '../lib/ProtectedRoute';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarPage() {
  return (
    <>
      <Head>
        <title>Calendar - Smart Study Planner</title>
      </Head>

      <ProtectedRoute>
        <Layout>
          {/* Page Header */}
          <div className="mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                📅 Task Calendar
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                View your tasks on a calendar and manage deadlines
              </p>
            </div>
          </div>

          {/* Calendar */}
          <Calendar />
        </Layout>
      </ProtectedRoute>
    </>
  );
}
