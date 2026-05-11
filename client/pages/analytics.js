import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Analytics from '../components/Analytics';
import ProtectedRoute from '../lib/ProtectedRoute';

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Progress Analytics - Smart Study Planner</title>
        <meta name="description" content="View your study progress analytics, productivity trends, and study hours" />
      </Head>

      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">📊 Progress Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track your study progress with detailed analytics and insights
            </p>
          </div>

          <Analytics />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
