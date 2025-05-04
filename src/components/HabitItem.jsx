// src/components/HabitItem.jsx
import React, { useState } from 'react';
import { toggleHabitCompletion, deleteHabit } from '../utils/localStorage';
import { getTodayStr, formatDateToDay, getCurrentWeekDates } from '../utils/dateUtils';
import '../styles/HabitItem.css';

const HabitItem = ({ habit, onHabitUpdated }) => {
  const [showMenu, setShowMenu] = useState(false);
  const todayStr = getTodayStr();
  const weekDates = getCurrentWeekDates();
  
  const handleToggleToday = (e) => {
    e.stopPropagation(); // Prevent triggering parent click
    toggleHabitCompletion(habit.id, todayStr);
    if (onHabitUpdated) onHabitUpdated();
  };
  
  const handleToggleDate = (e, dateStr) => {
    e.stopPropagation(); // Prevent triggering parent click
    toggleHabitCompletion(habit.id, dateStr);
    if (onHabitUpdated) onHabitUpdated();
  };
  
  const handleDeleteHabit = (e) => {
    e.stopPropagation(); // Prevent triggering parent click
    if (window.confirm(`Are you sure you want to delete "${habit.name}"?`)) {
      deleteHabit(habit.id);
      if (onHabitUpdated) onHabitUpdated();
    }
    setShowMenu(false);
  };
  
  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent triggering parent click
    setShowMenu(!showMenu);
  };
  
  const isCompletedToday = habit.completions && habit.completions[todayStr];
  
  return (
    <div className="habit-item" style={{ borderLeftColor: habit.color || '#4a69bd' }}>
      <div className="habit-item-header">
        <div className="habit-icon" style={{ backgroundColor: habit.color || '#4a69bd' }}>
          {habit.icon || '✓'}
        </div>
        
        <div className="habit-info">
          <h3 className="habit-name">{habit.name}</h3>
          <span className="habit-frequency">
            {habit.frequency === 'daily' ? 'Daily' : 'Weekly'}
          </span>
        </div>
        
        <button 
          className={`habit-check-button ${isCompletedToday ? 'completed' : ''}`}
          onClick={handleToggleToday}
          style={{ 
            borderColor: habit.color || '#4a69bd',
            backgroundColor: isCompletedToday ? habit.color || '#4a69bd' : 'transparent'
          }}
        >
          {isCompletedToday && '✓'}
        </button>
        
        <button className="habit-menu-button" onClick={toggleMenu}>
          ⋮
        </button>
        
        {showMenu && (
          <div className="habit-menu">
            <button className="delete-button" onClick={handleDeleteHabit}>
              Delete
            </button>
          </div>
        )}
      </div>
      
      {habit.frequency === 'weekly' && (
        <div className="week-view">
          {weekDates.map((dateStr) => {
            const isCompleted = habit.completions && habit.completions[dateStr];
            const isToday = dateStr === todayStr;
            
            return (
              <div 
                key={dateStr} 
                className={`day-item ${isToday ? 'today' : ''}`}
                onClick={(e) => handleToggleDate(e, dateStr)}
              >
                <div className="day-label">{formatDateToDay(dateStr)}</div>
                <div 
                  className={`day-indicator ${isCompleted ? 'completed' : ''}`}
                  style={{ 
                    borderColor: habit.color || '#4a69bd',
                    backgroundColor: isCompleted ? habit.color || '#4a69bd' : 'transparent'
                  }}
                >
                  {isCompleted && '✓'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HabitItem;