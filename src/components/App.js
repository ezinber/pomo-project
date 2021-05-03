import React, { useState } from 'react';
import Timer from './Timer/Timer';
import Task from './Task/Task';
import useLocalStorage from '../hooks/useLocalStorage';
import TimerContextProvider from '../contexts/timerContext';
import Header from './Header/Header';
import closeIcon from '../assets/icons/close.svg';
import './app.css';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', defaultTasks); //(Task)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClickOpenTasks = () => {
    setSidebarOpen(true);
  };

  const handleTimerEnd = (mode) => {
    console.log('Time in mode %s is out', mode.slug);
  };

  const handleTimerPause = (mode) => {
    console.log('Timer was paused in mode:', mode.slug);
  };

  const handleTimerStart = (mode) => {
    console.log('Timer has been started on mode:', mode.slug);
  };

  const handleTimerStop = (mode) => {
    console.log('Timer has been stopped on mode:', mode.slug);
  };

  const handleTimerModeChange = (slug) => {
    console.log('Timer mode was changed to:', slug);
  };

  function handleTaskDelete(task) {
    setTasks((state) => state.filter((current) => current.id !== task.id));
  }

  function handleTaskComplete(task) {
    task.isCompleted = !task.isCompleted;
    task.isActive && (task.isActive = !task.isActive);
    setTasks((state) =>
      state.map((current) => (current.id === task.id ? task : current))
    );
  }

  function handleTaskClick(task) {
    setTasks((state) =>
      state.map((current) => {
        current.id !== task.id
          ? (current.isActive = false)
          : (current.isActive = true);

        return current;
      })
    );
  }

  function handleTaskSubmit(task) {
    //setTasks(state => state.map(current => current.id === task.id ? task : current));
    setTasks((state) =>
      state.map((current) => {
        if (current.id === task.id) {
          return task;
        }
        return current;
      })
    );
  }

  return (
    <div className="app app_theme_dark">
      <TimerContextProvider>
        <div className="app__container">
          <Header
            sidebarOpened={sidebarOpen}
            onClickTasks={handleClickOpenTasks}
          />
          <Timer
            onStart={handleTimerStart}
            onPause={handleTimerPause}
            onStop={handleTimerStop}
            onEnd={handleTimerEnd}
            onModeChange={handleTimerModeChange}
          />
        </div>
        {/* Список задач возможно стоит вынести в отдельный компонент (Task)*/}
        <div
          className={`app__sidebar ${sidebarOpen ? 'app__sidebar_opened' : ''}`}
        >
          {sidebarOpen && (
            <button
              type="button"
              className="tasks-bar__close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close tasks-bar"
            >
              <img src={closeIcon} alt="Close" />
            </button>
          )}
          <ul className="tasks">
            {tasks.map((taskData) => (
              <Task
                key={taskData.id}
                task={taskData}
                onDelete={handleTaskDelete}
                onComplete={handleTaskComplete}
                onClick={handleTaskClick}
                onSubmit={handleTaskSubmit}
              />
            ))}
          </ul>
        </div>
      </TimerContextProvider>
    </div>
  );
}

let defaultTasks = [
  // массив задач для тестов (Task)
  {
    id: '1',
    text: 'first',
    isActive: true,
    isCompleted: false,
  },
  {
    id: '2',
    text: 'second',
    isActive: false,
    isCompleted: false,
  },
  {
    id: '3',
    text: 'third',
    isActive: false,
    isCompleted: true,
  },
];

export default App;
