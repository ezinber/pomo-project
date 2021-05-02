import React from 'react';
import Timer from './Timer/Timer';
import TimerContextProvider from '../contexts/timerContext';
import Header from './Header/Header';
import './app.css';

function App() {
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

  return (
    <div className="app app_theme_dark">
      <TimerContextProvider>
        <Header />
        <Timer
          onStart={handleTimerStart}
          onPause={handleTimerPause}
          onStop={handleTimerStop}
          onEnd={handleTimerEnd}
          onModeChange={handleTimerModeChange}
        />
      </TimerContextProvider>
    </div>
  );
}

export default App;
