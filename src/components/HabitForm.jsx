// src/components/HabitForm.jsx
import React, { useState } from 'react';
import '../styles/HabitForm.css';

const HabitForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    frequency: initialData?.frequency || 'daily',
    color: initialData?.color || '#4a69bd',
    icon: initialData?.icon || '✓',
    customDays: initialData?.customDays || []
  });

  const [errors, setErrors] = useState({});

  const iconOptions = ['✓', '🏃', '💧', '📚', '🧘', '💪', '🍎', '💤', '🧠', '🎯'];
  const colorOptions = [
    '#4a69bd', // Blue
    '#6ab04c', // Green
    '#eb4d4b', // Red
    '#f0932b', // Orange
    '#be2edd', // Purple
    '#22a6b3', // Teal
    '#4834d4', // Royal Blue
    '#badc58', // Yellow Green
    '#7ed6df', // Greenish Blue
    '#e056fd', // Pink
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleIconSelect = (icon) => {
    setFormData(prev => ({ ...prev, icon }));
  };

  const handleColorSelect = (color) => {
    setFormData(prev => ({ ...prev, color }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Habit name is required';
    }
    
    if (formData.name.trim().length > 30) {
      newErrors.name = 'Habit name must be 30 characters or less';
    }
    
    if (formData.description.length > 100) {
      newErrors.description = 'Description must be 100 characters or less';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Habit Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Drink Water, Read, Exercise"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description (Optional)</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="What do you want to achieve with this habit?"
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>
      
      <div className="form-group">
        <label>Frequency</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="frequency"
              value="daily"
              checked={formData.frequency === 'daily'}
              onChange={handleChange}
            />
            Daily
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="frequency"
              value="weekly"
              checked={formData.frequency === 'weekly'}
              onChange={handleChange}
            />
            Weekly
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label>Select an Icon</label>
        <div className="icon-selector">
          {iconOptions.map((icon, index) => (
            <button
              key={index}
              type="button"
              className={`icon-option ${formData.icon === icon ? 'selected' : ''}`}
              onClick={() => handleIconSelect(icon)}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
      
      <div className="form-group">
        <label>Select a Color</label>
        <div className="color-selector">
          {colorOptions.map((color, index) => (
            <button
              key={index}
              type="button"
              className={`color-option ${formData.color === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
            />
          ))}
        </div>
      </div>
      
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Save Habit
        </button>
      </div>
    </form>
  );
};

export default HabitForm;