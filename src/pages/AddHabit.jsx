// src/pages/AddHabit.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HabitForm from '../components/HabitForm';
import { addHabit } from '../utils/localStorage';
import '../styles/AddHabit.css';

const AddHabit = () => {
  const navigate = useNavigate();

  const handleAddHabit = (habitData) => {
    addHabit(habitData);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="add-habit-page">
      <header className="add-habit-header">
        <h1>Add a New Habit</h1>
        <button className="back-btn" onClick={handleCancel}>
          &larr; Back
        </button>
      </header>
      
      <HabitForm onSubmit={handleAddHabit} onCancel={handleCancel} />
      
      <div className="habit-tips">
        <h3>Tips for Building Habits</h3>
        <ul>
          <li>Start small and be consistent</li>
          <li>Stack new habits on existing routines</li>
          <li>Track your progress daily</li>
          <li>Focus on the process, not just the outcome</li>
          <li>Create a supportive environment</li>
        </ul>
      </div>
    </div>
  );
};

export default AddHabit;