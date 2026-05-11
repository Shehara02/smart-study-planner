// Notifications Controller
// Handles notifications and reminders for tasks

const prisma = require('../config/database');
const { API_MESSAGES } = require('../config/constants');

/**
 * Get notifications for authenticated user
 * GET /api/notifications
 * Returns upcoming deadlines and overdue tasks
 */
const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    
    // Get user's tasks
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { deadline: 'asc' }
    });

    const notifications = [];

    tasks.forEach(task => {
      if (!task.completed && task.deadline) {
        const deadline = new Date(task.deadline);
        const timeDiff = deadline.getTime() - now.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        // Overdue tasks (deadline has passed)
        if (daysDiff < 0) {
          notifications.push({
            id: `overdue-${task.id}`,
            type: 'overdue',
            title: `Overdue: ${task.title}`,
            description: `This task was due ${Math.abs(daysDiff)} days ago`,
            taskId: task.id,
            taskTitle: task.title,
            deadline: task.deadline,
            priority: task.priority,
            daysDiff,
            timestamp: now
          });
        }
        // Due today
        else if (daysDiff === 0) {
          notifications.push({
            id: `today-${task.id}`,
            type: 'today',
            title: `Due Today: ${task.title}`,
            description: 'This task is due today!',
            taskId: task.id,
            taskTitle: task.title,
            deadline: task.deadline,
            priority: task.priority,
            daysDiff: 0,
            timestamp: now
          });
        }
        // Due soon (within 3 days)
        else if (daysDiff > 0 && daysDiff <= 3) {
          notifications.push({
            id: `soon-${task.id}`,
            type: 'upcoming',
            title: `Due Soon: ${task.title}`,
            description: `This task is due in ${daysDiff} day${daysDiff > 1 ? 's' : ''}`,
            taskId: task.id,
            taskTitle: task.title,
            deadline: task.deadline,
            priority: task.priority,
            daysDiff,
            timestamp: now
          });
        }
        // Due later (3+ days away)
        else if (daysDiff > 3 && daysDiff <= 7) {
          notifications.push({
            id: `week-${task.id}`,
            type: 'upcoming',
            title: `Upcoming: ${task.title}`,
            description: `This task is due in ${daysDiff} days`,
            taskId: task.id,
            taskTitle: task.title,
            deadline: task.deadline,
            priority: task.priority,
            daysDiff,
            timestamp: now
          });
        }
      }
    });

    // Sort notifications: overdue first, then today, then upcoming
    const priorityOrder = { 'overdue': 0, 'today': 1, 'upcoming': 2 };
    notifications.sort((a, b) => {
      const priorityDiff = priorityOrder[a.type] - priorityOrder[b.type];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Within same type, sort by days difference (ascending)
      return a.daysDiff - b.daysDiff;
    });

    res.status(200).json({
      success: true,
      data: {
        notifications,
        summary: {
          total: notifications.length,
          overdue: notifications.filter(n => n.type === 'overdue').length,
          today: notifications.filter(n => n.type === 'today').length,
          upcoming: notifications.filter(n => n.type === 'upcoming').length
        }
      }
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

module.exports = {
  getNotifications
};
