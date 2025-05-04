// src/components/HabitList.jsx
import React from 'react';
import HabitItem from './HabitItem';
import ProgressBar from './ProgressBar';
import { getTodayStr, getCurrentWeekDates } from '../utils/dateUtils';
import '../styles/HabitList.css';

const HabitList = ({ habits, onHabitUpdated, onSelectHabit, selectedHabitId }) => {
  const todayStr = getTodayStr();
  const weekDates = getCurrentWeekDates();
  
  // Calculate streak and completion stats
  const calculateProgress = (habit) => {
    if (!habit.completions) return 0;
    
    if (habit.frequency === 'daily') {
      // For daily habits, check if completed today
      return habit.completions[todayStr] ? 100 : 0;
    } else if (habit.frequency === 'weekly') {
      // For weekly habits, calculate percentage completed this week
      const totalDaysInWeek = weekDates.length;
      const completedDays = weekDates.filter(date => habit.completions[date]).length;
      return (completedDays / totalDaysInWeek) * 100;
    }
    
    return 0;
  };
  
  // Calculate current streak
  const calculateStreak = (habit) => {
    if (!habit.completions) return 0;
    
    let streak = 0;
    const today = new Date();
    let currentDate = new Date(today);
    
    // Check backward from today
    while (habit.completions[currentDate.toISOString().split('T')[0]]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  };

  const handleHabitClick = (habitId) => {
    if (onSelectHabit) {
      onSelectHabit(habitId);
    }
  };

  return (
    <div className="habit-list">
      {habits.length === 0 ? (
        <p className="no-habits-message">No habits found.</p>
      ) : (
        habits.map((habit) => (
          <div 
            key={habit.id} 
            className={`habit-container ${selectedHabitId === habit.id ? 'selected' : ''}`}
            onClick={() => handleHabitClick(habit.id)}
          >
            <HabitItem 
              habit={habit}
              onHabitUpdated={onHabitUpdated}
            />
            <div className="habit-stats">
              <div className="streak-counter">
                <span className="streak-number">{calculateStreak(habit)}</span>
                <span className="streak-label">day streak</span>
              </div>
              <div className="progress-container">
                <ProgressBar 
                  progress={calculateProgress(habit)}
                  color={habit.color || '#4a69bd'}
                />
                <span className="progress-label">
                  {habit.frequency === 'daily' ? 'Today' : 'This week'}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HabitList;