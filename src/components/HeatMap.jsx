// src/components/HeatMap.jsx
import React from 'react';
import { getLastNDays, formatDateToDay, getMonthName } from '../utils/dateUtils';
import '../styles/HeatMap.css';

const HeatMap = ({ habitData, days = 28 }) => {
  const dates = getLastNDays(days);
  const completions = habitData.completions || {};
  
  // Group dates by month
  const groupedDates = {};
  dates.forEach(date => {
    const month = getMonthName(date);
    if (!groupedDates[month]) {
      groupedDates[month] = [];
    }
    groupedDates[month].push(date);
  });

  return (
    <div className="heat-map">
      <h3>Activity Streak</h3>
      
      {Object.keys(groupedDates).map(month => (
        <div key={month} className="month-container">
          <h4 className="month-header">{month}</h4>
          <div className="days-grid">
            {groupedDates[month].map(date => {
              const isCompleted = completions[date];
              const dayLabel = new Date(date).getDate();
              const dayName = formatDateToDay(date);
              
              return (
                <div 
                  key={date} 
                  className={`day-cell ${isCompleted ? 'completed' : ''}`}
                  title={`${dayName}, ${date}: ${isCompleted ? 'Completed' : 'Not completed'}`}
                  style={{ 
                    backgroundColor: isCompleted ? habitData.color || '#4a69bd' : 'transparent',
                    opacity: isCompleted ? 1 : 0.15
                  }}
                >
                  <span className="day-number">{dayLabel}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
      <div className="heatmap-legend">
        <div className="legend-item">
          <div 
            className="legend-box" 
            style={{ backgroundColor: 'transparent', opacity: 0.15, border: '1px solid #ccc' }}
          ></div>
          <span>Not completed</span>
        </div>
        <div className="legend-item">
          <div 
            className="legend-box" 
            style={{ backgroundColor: habitData.color || '#4a69bd' }}
          ></div>
          <span>Completed</span>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;