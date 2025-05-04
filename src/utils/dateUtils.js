// src/utils/dateUtils.js

// Get today's date in YYYY-MM-DD format
export const getTodayStr = () => {
    return new Date().toISOString().split('T')[0];
  };
  
  // Get an array of dates for the last N days
  export const getLastNDays = (n) => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < n; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.unshift(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };
  
  // Get an array of dates for the current week (Sunday to Saturday)
  export const getCurrentWeekDates = () => {
    const dates = [];
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday, 6 is Saturday
    
    // Start from Sunday of current week
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - currentDay);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };
  
  // Format date to display in UI (e.g., "Mon", "Tue", etc.)
  export const formatDateToDay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  // Get dates for heatmap (last 4 weeks = 28 days)
  export const getHeatmapDates = () => {
    return getLastNDays(28);
  };
  
  // Get month name from date string
  export const getMonthName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long' });
  };
  
  // Check if a habit is due today based on frequency
  export const isHabitDueToday = (habit) => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
    
    if (habit.frequency === 'daily') {
      return true;
    }
    
    if (habit.frequency === 'weekly') {
      return true; // Can be completed any day of the week
    }
    
    if (habit.customDays && Array.isArray(habit.customDays)) {
      return habit.customDays.includes(dayOfWeek);
    }
    
    return false;
  };