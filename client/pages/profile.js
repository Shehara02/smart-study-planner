import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Profile from '../components/Profile';
import ProtectedRoute from '../lib/ProtectedRoute';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>User Profile - Smart Study Planner</title>
        <meta name="description" content="View and edit your user profile, bio, and study goals" />
      </Head>

      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">👤 My Profile</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your profile, add a picture, and share your study goals
            </p>
          </div>

          <Profile />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
