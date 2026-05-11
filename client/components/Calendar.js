// Calendar Component
// Displays tasks on an interactive calendar

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { taskAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks and convert to calendar events
  useEffect(() => {
    fetchTasksForCalendar();
  }, []);

  const fetchTasksForCalendar = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks();
      const tasks = response.data.data;

      // Convert tasks to FullCalendar events
      const calendarEvents = tasks.map((task) => ({
        id: task.id.toString(),
        title: task.title,
        date: task.deadline ? task.deadline.split('T')[0] : null,
        extendedProps: {
          description: task.description,
          priority: task.priority,
          completed: task.completed,
          taskId: task.id,
        },
        backgroundColor: getPriorityColor(task.priority),
        borderColor: getPriorityColor(task.priority),
        classNames: task.completed ? ['completed-task'] : [],
        display: task.deadline ? 'auto' : 'none', // Hide events without deadlines
      }));

      // Filter out events without dates
      const validEvents = calendarEvents.filter((event) => event.date);
      setEvents(validEvents);
    } catch (error) {
      toast.error('Failed to load tasks for calendar');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Get color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return '#dc2626'; // Red
      case 'MEDIUM':
        return '#f59e0b'; // Amber
      case 'LOW':
        return '#10b981'; // Green
      default:
        return '#3b82f6'; // Blue
    }
  };

  // Handle event click to show task details
  const handleEventClick = (info) => {
    const { description, priority, completed } = info.event.extendedProps;
    const message = `
      Task: ${info.event.title}
      Priority: ${priority}
      Status: ${completed ? 'Completed ✓' : 'Pending'}
      ${description ? `Description: ${description}` : ''}
    `;
    toast((t) => (
      <div className="space-y-2">
        <p className="font-bold">{info.event.title}</p>
        <p>
          <strong>Priority:</strong> <span className={`px-2 py-1 rounded text-white text-sm ${
            priority === 'HIGH'
              ? 'bg-red-600'
              : priority === 'MEDIUM'
              ? 'bg-amber-600'
              : 'bg-green-600'
          }`}>
            {priority}
          </span>
        </p>
        <p><strong>Status:</strong> {completed ? '✓ Completed' : '⏳ Pending'}</p>
        {description && (
          <p><strong>Description:</strong> {description}</p>
        )}
        <button
          onClick={() => toast.dismiss(t.id)}
          className="mt-2 px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    ), {
      duration: Infinity,
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading calendar...</p>
      </div>
    );
  }

  return (
    <div className="calendar-container bg-white dark:bg-slate-900 rounded-lg shadow-md p-6">
      <style>{`
        .fc {
          --fc-page-bg-color: transparent;
          --fc-border-color: #e5e7eb;
        }
        
        .dark .fc {
          --fc-border-color: #334155;
          --fc-text-color: #f1f5f9;
          --fc-bg-color: #1e293b;
        }

        .fc-daygrid-day {
          background-color: transparent;
        }

        .dark .fc-daygrid-day {
          background-color: transparent;
        }

        .fc-button-primary {
          background-color: #3b82f6;
          border-color: #3b82f6;
        }

        .fc-button-primary:hover {
          background-color: #2563eb;
          border-color: #2563eb;
        }

        .fc-button-primary:not(:disabled):active {
          background-color: #1d4ed8;
          border-color: #1d4ed8;
        }

        .dark .fc-button-primary {
          background-color: #3b82f6;
        }

        .fc-col-header-cell {
          background-color: #f3f4f6;
          color: #1f2937;
          font-weight: 600;
        }

        .dark .fc-col-header-cell {
          background-color: #1e293b;
          color: #f1f5f9;
        }

        .fc-daygrid-day.fc-day-other {
          opacity: 0.3;
        }

        .completed-task {
          opacity: 0.6;
          text-decoration: line-through;
        }

        .fc-event {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .fc-event:hover {
          opacity: 0.8;
          transform: scale(1.02);
        }

        .fc-theme-standard .fc-daygrid-day-number {
          padding: 0.5rem;
        }

        .fc-daygrid-day-frame {
          min-height: 100px;
        }
      `}</style>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        eventClick={handleEventClick}
        height="auto"
        contentHeight="auto"
        dayMaxEvents={2}
        dayMaxEventRows={true}
      />

      {/* Task Summary */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks with Deadline</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{events.length}</p>
        </div>
        <div className="bg-amber-50 dark:bg-slate-800 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {events.filter((e) => e.extendedProps.priority === 'HIGH').length}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-slate-800 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {events.filter((e) => e.extendedProps.completed).length}
          </p>
        </div>
      </div>
    </div>
  );
}
