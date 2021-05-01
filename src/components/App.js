import React, { useContext, useEffect } from 'react';
import SettingsContext from '../contexts/settingsContext';
import Timer from './Timer/Timer';
import Task from './Task/Task';
import useLocalStorage from '../hooks/useLocalStorage';
import './app.css';

function App() {
  const defaultSettings = useContext(SettingsContext);
  const [settings, setSetting] = useLocalStorage('settings', defaultSettings);
  const [tasks, setTasks] = useLocalStorage('tasks', defaultTasks); //(Task)

  const handleTimerEnd = (mode) => {
    console.log('Time in mode %d is out', mode);
  }

  const handleTimerPause = (mode) => {
    console.log('Timer was paused in mode:', mode);
  }

  const handleTimerStart = (mode) => {
    console.log('Timer has been started on mode:', mode);
  }

  const handleTimerModeChange = (mode) => {
    console.log('Timer mode was changed on:', mode);
  }



  function handleTaskDelete(task) {
    setTasks(state => state.filter(current => current.id !== task.id));
  }

  function handleTaskComplete(task) {
    task.isCompleted = !task.isCompleted;
    task.isActive && (task.isActive = !task.isActive);
    setTasks(state => state.map(current => current.id === task.id ? task : current))
  }

  function handleTaskClick(task) {
    setTasks(state => state.map(current => {
      current.id !== task.id
      ? current.isActive = false
      : current.isActive = true;

      return current;
    }));
  }

  function handleTaskSubmit(task) {
    //setTasks(state => state.map(current => current.id === task.id ? task : current));
    setTasks(state => state.map(current => {
      if (current.id === task.id) {
        return task;
      }
      return current;
    }));
  }

  /*Так как немного изменилась структура объекта настроек,
  сделал сброс на настройки по умолчанию, в случае, если сохранены
  настройки со старой структурой*/
  useEffect(() => {
    if (!settings?.timer?.work) {
      setSetting(defaultSettings);
    }
  }, [settings]);


  return (
    <SettingsContext.Provider value={settings}>
      <div className="app">
        <Timer
          settings={settings.timer}
          onStart={handleTimerStart}
          onPause={handleTimerPause}
          onEnd={handleTimerEnd}
          onModeChange={handleTimerModeChange}
        />

        {/* Список задач возможно стоит вынести в отдельный компонент (Task)*/}
        <ul className="app__sidebar">
          {tasks.map(taskData => (
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
    </SettingsContext.Provider>
  );
}

let defaultTasks = [ // массив задач для тестов (Task)
  {
    id: '1',
    text: 'first',
    isActive: true,
    isCompleted: false
  },
  {
    id: '2',
    text: 'second',
    isActive: false,
    isCompleted: false
  },
  {
    id: '3',
    text: 'third',
    isActive: false,
    isCompleted: true
  },
]

export default App;
