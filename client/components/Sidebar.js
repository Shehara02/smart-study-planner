// Sidebar Component
// Navigation sidebar for the application

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, LayoutDashboard, CheckSquare2, Calendar, BarChart3, User, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ open, setOpen }) {
  const router = useRouter();
  const { logout } = useAuth();

  const menuItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: '/dashboard',
    },
    {
      label: 'Tasks',
      icon: <CheckSquare2 className="w-5 h-5" />,
      href: '/tasks',
    },
    {
      label: 'Calendar',
      icon: <Calendar className="w-5 h-5" />,
      href: '/calendar',
    },
    {
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      href: '/analytics',
    },
    {
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
      href: '/profile',
    },
    {
      label: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      href: '/notifications',
    },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          open ? 'w-64' : 'w-0'
        } bg-white dark:bg-slate-900 shadow-lg transition-all duration-300 overflow-hidden md:w-64`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              📚 StudyHub
            </h1>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  router.pathname === item.href
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
