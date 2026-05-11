// Analytics Controller
// Handles analytics and progress reports

const prisma = require('../config/database');
const { API_MESSAGES } = require('../config/constants');

/**
 * Get analytics dashboard data
 * GET /api/analytics
 */
const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

    // Get all tasks for the user
    const allTasks = await prisma.task.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        completed: true,
        createdAt: true,
        updatedAt: true,
        deadline: true,
        priority: true
      }
    });

    // 1. Total completed tasks (all time)
    const totalCompleted = allTasks.filter(t => t.completed).length;

    // 2. Completed tasks this month
    const completedThisMonth = allTasks.filter(t => 
      t.completed && new Date(t.updatedAt) >= thirtyDaysAgo
    ).length;

    // 3. Weekly productivity (last 4 weeks)
    const weeklyProductivity = getWeeklyProductivity(allTasks);

    // 4. Daily productivity (last 7 days)
    const dailyProductivity = getDailyProductivity(allTasks);

    // 5. Study hours (estimated from completed tasks)
    const studyHours = getEstimatedStudyHours(allTasks);

    // 6. Priority breakdown
    const priorityBreakdown = getPriorityBreakdown(allTasks);

    // 7. Completion rate
    const completionRate = allTasks.length > 0 
      ? Math.round((totalCompleted / allTasks.length) * 100)
      : 0;

    // 8. Total tasks
    const totalTasks = allTasks.length;

    // 9. Pending tasks
    const pendingTasks = allTasks.filter(t => !t.completed).length;

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalTasks,
          totalCompleted,
          completedThisMonth,
          pendingTasks,
          completionRate
        },
        weeklyProductivity,
        dailyProductivity,
        studyHours,
        priorityBreakdown
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

/**
 * Calculate weekly productivity for the last 4 weeks
 */
const getWeeklyProductivity = (tasks) => {
  const now = new Date();
  const weeks = [];

  for (let i = 3; i >= 0; i--) {
    const weekStart = new Date(now.getTime() - (i * 7) * 24 * 60 * 60 * 1000);
    const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const weekLabel = `Week of ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    const completed = tasks.filter(t => 
      t.completed && new Date(t.updatedAt) >= weekStart && new Date(t.updatedAt) < weekEnd
    ).length;

    weeks.push({
      name: weekLabel,
      completed,
      week: i
    });
  }

  return weeks;
};

/**
 * Calculate daily productivity for the last 7 days
 */
const getDailyProductivity = (tasks) => {
  const now = new Date();
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const dayStart = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    dayStart.setHours(0, 0, 0, 0);
    
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
    
    const dayLabel = dayStart.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const completed = tasks.filter(t => 
      t.completed && new Date(t.updatedAt) >= dayStart && new Date(t.updatedAt) < dayEnd
    ).length;

    days.push({
      name: dayLabel,
      completed,
      date: dayStart.toISOString().split('T')[0]
    });
  }

  return days;
};

/**
 * Estimate study hours based on task characteristics
 * Rules: HIGH priority = 2 hours, MEDIUM = 1.5 hours, LOW = 1 hour
 */
const getEstimatedStudyHours = (tasks) => {
  const completedTasks = tasks.filter(t => t.completed);
  
  let totalHours = 0;
  completedTasks.forEach(task => {
    if (task.priority === 'HIGH') totalHours += 2;
    else if (task.priority === 'MEDIUM') totalHours += 1.5;
    else totalHours += 1;
  });

  // Calculate by week
  const now = new Date();
  const weeks = [];

  for (let i = 3; i >= 0; i--) {
    const weekStart = new Date(now.getTime() - (i * 7) * 24 * 60 * 60 * 1000);
    const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const weekLabel = `Week ${4 - i}`;
    let weekHours = 0;

    completedTasks.forEach(task => {
      if (new Date(task.updatedAt) >= weekStart && new Date(task.updatedAt) < weekEnd) {
        if (task.priority === 'HIGH') weekHours += 2;
        else if (task.priority === 'MEDIUM') weekHours += 1.5;
        else weekHours += 1;
      }
    });

    weeks.push({
      name: weekLabel,
      hours: parseFloat(weekHours.toFixed(1))
    });
  }

  return {
    total: parseFloat(totalHours.toFixed(1)),
    byWeek: weeks
  };
};

/**
 * Get priority breakdown of all tasks
 */
const getPriorityBreakdown = (tasks) => {
  const high = tasks.filter(t => t.priority === 'HIGH').length;
  const medium = tasks.filter(t => t.priority === 'MEDIUM').length;
  const low = tasks.filter(t => t.priority === 'LOW').length;

  return [
    { name: 'High Priority', value: high, color: '#dc2626' },
    { name: 'Medium Priority', value: medium, color: '#f59e0b' },
    { name: 'Low Priority', value: low, color: '#10b981' }
  ];
};

module.exports = {
  getAnalytics
};
