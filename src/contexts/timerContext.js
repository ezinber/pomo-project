import { createContext, useContext, useEffect, useState } from 'react';
import SettingsContext from './settingsContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { TIMER_REMAINING_KEY } from '../utils/constants';

export const TimerContext = createContext({});

const TimerContextProvider = ({ children }) => {
  const defaultSettings = useContext(SettingsContext);
  const [settings, setSettings] = useLocalStorage('settings', defaultSettings);
  const [executing, setExecuting] = useLocalStorage(
    'executing',
    settings.timer.work
  );
  const [timerKey, setTimerKey] = useLocalStorage('timer-key', 0);
  const [timerTime, setTimerTime] = useState(executing.time);
  const [isPlaying, setIsPlaying] = useState(false);

  const reset = () => {
    setTimerKey((state) => (state > 100 ? 0 : state + 1));
    localStorage.removeItem(TIMER_REMAINING_KEY);
  };

  const start = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const stop = () => {
    setTimerTime(executing.time);
    reset();
  };

  const changeMode = (slug) => {
    setIsPlaying(false);
    setExecuting(settings.timer[slug]);
    setTimerTime(settings.timer[slug].time);
    reset();
  };

  useEffect(() => {
    if (!settings?.timer?.work) {
      setSettings(defaultSettings);
    }
  }, [settings, setSettings, defaultSettings]);

  return (
    <TimerContext.Provider
      value={{
        executing,
        timerKey,
        start,
        pause,
        stop,
        timerTime,
        isPlaying,
        changeMode,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContextProvider;
