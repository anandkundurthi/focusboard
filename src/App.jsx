import Calendar from './components/dashboard/Calendar';
import Settings from './components/dashboard/Settings';

import { useState } from 'react';

import './App.css';

import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import FocusNotes from './components/dashboard/FocusNotes';
import StatsCards from './components/dashboard/StatsCards';
import TaskList from './components/tasks/TaskList';
import NewTaskModal from './components/tasks/NewTaskModal';

function App() {
  const [activeItem, setActiveItem] = useState('Overview');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
      />

      <div className="main-area">
        <Header
          activeItem={activeItem}
          onNavigate={setActiveItem}
        />
        <main className="dashboard-content">
          {activeItem === 'Overview' && (
            <>
              <div className="page-heading">
                <div>
                  <h1>Your work, in focus.</h1>
                  <p>
                    Plan your day, stay organized, and celebrate small wins.
                  </p>
                </div>

                <button
                  className="primary-button"
                  type="button"
                  onClick={() => setIsTaskModalOpen(true)}
                >
                  + New task
                </button>
              </div>

              <FocusNotes />
              <StatsCards />
              <TaskList />
            </>
          )}

          {activeItem === 'My tasks' && (
            <>
              <div className="page-heading">
                <div>
                  <h1>My Tasks</h1>
                  <p>
                    Organize your work, manage priorities, and track progress.
                  </p>
                </div>

                <button
                  className="primary-button"
                  type="button"
                  onClick={() => setIsTaskModalOpen(true)}
                >
                  + New task
                </button>
              </div>

              <StatsCards />
              <TaskList />
            </>
          )}

          {activeItem === 'Calendar' && (
            <>
              <div className="page-heading">
                <div>
                  <h1>Calendar</h1>
                  <p>Your upcoming tasks and deadlines.</p>
                </div>
              </div>

              <Calendar />
            </>
          )}

          
          {activeItem === 'Settings' && (
            <>
              <div className="page-heading">
                <div>
                  <h1>Settings</h1>
                  <p>Manage your FocusBoard preferences.</p>
                </div>
              </div>

              <Settings />
            </>
          )}

        </main>
      </div>

      {isTaskModalOpen && (
        <NewTaskModal
          onClose={() => setIsTaskModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
