import React, { useContext, useEffect } from 'react';
import SettingsContext from '../contexts/settingsContext';
import Timer from './Timer/Timer';
import useLocalStorage from '../hooks/useLocalStorage';
import './app.css';

function App() {
  const defaultSettings = useContext(SettingsContext);
  const [settings, setSetting] = useLocalStorage('settings', defaultSettings);

  const handleTimerEnd = (mode) => {
    console.log('Time in mode %s is out', mode.slug);
  }

  const handleTimerPause = (mode) => {
    console.log('Timer was paused in mode:', mode.slug);
  }

  const handleTimerStart = (mode) => {
    console.log('Timer has been started on mode:', mode.slug);
  }

  const handleTimerModeChange = (mode) => {
    console.log('Timer mode was changed on:', mode.slug);
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
      <div className="App">
        <Timer
          settings={settings.timer}
          onStart={handleTimerStart}
          onPause={handleTimerPause}
          onEnd={handleTimerEnd}
          onModeChange={handleTimerModeChange}
        />
      </div>
    </SettingsContext.Provider>
  );
}

export default App;
