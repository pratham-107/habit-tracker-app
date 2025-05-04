# Habit Tracker App

A modern React application for tracking daily and weekly habits with a clean, intuitive interface.

![Habit Tracker App Screenshot](https://via.placeholder.com/800x450.png?text=Habit+Tracker+Screenshot)

## Features

- **Habit Creation & Management**
  - Create custom habits with names, descriptions, and frequency settings
  - Choose from multiple icons and colors for visual customization
  - Delete habits that are no longer needed

- **Habit Tracking**
  - Mark habits as complete with a simple click
  - Track daily and weekly habits with different views
  - View completion history with an interactive calendar heat map
  - Monitor progress with visual indicators and streak counters

- **User Interface**
  - Clean, responsive design works on desktop and mobile devices
  - Filter habits by frequency (daily/weekly/all)
  - Detailed habit view with statistics and completion history
  - Intuitive navigation between dashboard and habit creation

- **Data Management**
  - Persistent storage using browser's localStorage
  - No account required - works offline
  - Data remains after browser refresh

## Technologies Used

- **React** (v19.0.0) - Frontend library for building the user interface
- **React Router** (v7.5.3) - For navigation between pages
- **Vite** (v6.3.1) - Build tool and development server
- **CSS3** - Custom styling with modular CSS files
- **LocalStorage API** - For data persistence
- **JavaScript (ES6+)** - Modern JavaScript features

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/habit-tracker.git
   cd habit-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
habit-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── HabitForm.jsx
│   │   ├── HabitItem.jsx
│   │   ├── HabitList.jsx
│   │   ├── HeatMap.jsx
│   │   └── ProgressBar.jsx
│   ├── pages/
│   │   ├── AddHabit.jsx
│   │   └── Dashboard.jsx
│   ├── styles/
│   │   ├── AddHabit.css
│   │   ├── Dashboard.css
│   │   ├── HabitForm.css
│   │   ├── HabitItem.css
│   │   ├── HabitList.css
│   │   ├── HeatMap.css
│   │   ├── ProgressBar.css
│   │   └── index.css
│   ├── utils/
│   │   ├── dateUtils.js
│   │   └── localStorage.js
│   ├── App.jsx
│   └── main.jsx
├── .eslintrc.js
├── package.json
└── vite.config.js
```

## Usage Guide

### Dashboard

The dashboard displays all your habits with their current progress and streak information. From here you can:

- View all your habits or filter by daily/weekly
- Click a habit to see detailed statistics and history
- Mark habits as complete by clicking the checkbox
- Add new habits with the "Add New Habit" button
- Delete habits by clicking the menu button (⋮) and selecting "Delete"

### Adding a New Habit

1. Click "Add New Habit" from the dashboard
2. Fill in the habit details:
   - Name (required)
   - Description (optional)
   - Frequency (daily or weekly)
   - Icon and color for visual identification
3. Click "Save Habit" to create your new habit

### Tracking Habits

- For daily habits: Simply click the checkbox to mark as complete for today
- For weekly habits: Use the day indicators to mark specific days as complete

### Viewing Statistics

Click on any habit to see:
- Detailed description
- Current streak
- Completion history as a calendar heat map

## Future Enhancements

- User accounts and cloud synchronization
- Notifications and reminders
- Mobile app version
- Habit categories and tags
- More detailed analytics and insights
- Sharing and social features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons and design inspiration from various open-source projects
- Thanks to all contributors who have helped improve this app

---

Made with ❤️ by pratham-107
