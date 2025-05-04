// src/utils/localStorage.js
const HABITS_STORAGE_KEY = 'habitTracker_habits';

// Get all habits from localStorage
export const getHabits = () => {
  const habits = localStorage.getItem(HABITS_STORAGE_KEY);
  return habits ? JSON.parse(habits) : [];
};

// Save all habits to localStorage
export const saveHabits = (habits) => {
  localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
};

// Add a new habit
export const addHabit = (habit) => {
  const habits = getHabits();
  const newHabit = {
    ...habit,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    completions: {}
  };
  saveHabits([...habits, newHabit]);
  return newHabit;
};

// Delete a habit
export const deleteHabit = (habitId) => {
  const habits = getHabits();
  const updatedHabits = habits.filter(habit => habit.id !== habitId);
  saveHabits(updatedHabits);
};

// Toggle completion for a habit on a specific date
export const toggleHabitCompletion = (habitId, dateStr) => {
  const habits = getHabits();
  const updatedHabits = habits.map(habit => {
    if (habit.id === habitId) {
      const updatedCompletions = { ...habit.completions };
      
      if (updatedCompletions[dateStr]) {
        delete updatedCompletions[dateStr];
      } else {
        updatedCompletions[dateStr] = true;
      }
      
      return { ...habit, completions: updatedCompletions };
    }
    return habit;
  });
  
  saveHabits(updatedHabits);
  return updatedHabits.find(h => h.id === habitId);
};

// Get habit completion stats
export const getHabitStats = (habit) => {
  if (!habit.completions) return { streak: 0, completed: 0, total: 0 };
  
  const completedDays = Object.keys(habit.completions).length;
  
  // Calculate current streak
  let streak = 0;
  const today = new Date();
  let currentDate = new Date(today);
  
  // Check backward from today
  while (habit.completions[currentDate.toISOString().split('T')[0]]) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  // For weekly habits, track completion percentage for this week
  let total = 0;
  let completed = 0;
  
  if (habit.frequency === 'weekly') {
    // Get days in current week
    const startOfWeek = new Date(today);
    const currentDay = today.getDay();
    startOfWeek.setDate(today.getDate() - currentDay);
    
    for (let i = 0; i <= 6; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const dayStr = day.toISOString().split('T')[0];
      
      if (day <= today) {
        total++;
        if (habit.completions[dayStr]) {
          completed++;
        }
      }
    }
  }
  
  return { streak, completed, total };
};