// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HabitList from '../components/HabitList';
import HeatMap from '../components/HeatMap';
import { getHabits } from '../utils/localStorage';
import { getTodayStr } from '../utils/dateUtils';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all', 'daily', 'weekly'
  const todayStr = getTodayStr();

  useEffect(() => {
    // Load habits from localStorage
    const loadedHabits = getHabits();
    setHabits(loadedHabits);
    
    // Select first habit by default if available
    if (loadedHabits.length > 0 && !selectedHabit) {
      setSelectedHabit(loadedHabits[0].id);
    }
  }, []);

  const handleHabitUpdated = () => {
    // Refresh habits after update
    setHabits(getHabits());
  };

  const filteredHabits = habits.filter(habit => {
    if (filterType === 'all') return true;
    return habit.frequency === filterType;
  });

  const selectedHabitData = habits.find(h => h.id === selectedHabit);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Habit Tracker</h1>
        <div className="date-display">{new Date(todayStr).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </header>

      <div className="dashboard-actions">
        <Link to="/add" className="add-habit-btn">+ Add New Habit</Link>
        <div className="filter-options">
          <button 
            className={filterType === 'all' ? 'active' : ''} 
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button 
            className={filterType === 'daily' ? 'active' : ''} 
            onClick={() => setFilterType('daily')}
          >
            Daily
          </button>
          <button 
            className={filterType === 'weekly' ? 'active' : ''} 
            onClick={() => setFilterType('weekly')}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="habits-section">
          {habits.length === 0 ? (
            <div className="no-habits">
              <p>You haven't created any habits yet.</p>
              <Link to="/add" className="start-btn">Start Tracking</Link>
            </div>
          ) : (
            <HabitList 
              habits={filteredHabits} 
              onHabitUpdated={handleHabitUpdated}
              onSelectHabit={setSelectedHabit}
              selectedHabitId={selectedHabit}
            />
          )}
        </div>
        
        {selectedHabitData && (
          <div className="habit-details">
            <h2>{selectedHabitData.name}</h2>
            <p className="habit-description">{selectedHabitData.description || 'No description'}</p>
            <p className="habit-frequency">
              Frequency: {selectedHabitData.frequency === 'daily' ? 'Every day' : 'Weekly'}
            </p>
            
            <HeatMap 
              habitData={selectedHabitData} 
              days={28} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;