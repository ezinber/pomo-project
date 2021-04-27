import React, { useEffect, useState } from 'react';
import { secondsToFormatTime } from '../../utils/utils';
import useInterval from '../../hooks/useInterval';
import useLocalStorage from '../../hooks/useLocalStorage';
import Button from './Button';
import './timer.css';

function Timer({ settings, onEnd, onStart, onPause, onModeChange }) {
  const [mode, setMode] = useLocalStorage('mode', settings.work.slug);
  const [run, setRun] = useState(null);
  const [timerTime, setTimerTime] = useLocalStorage('timer', settings.work.time);

  const handleClickTimer = () => {
    if (run) {
      onPause(mode);
      setRun(null);
    } else {
      onStart(mode);
      setRun(1000);
    }
  }

  const modeChange = (newMode) => {
    setRun(null);
    setMode(newMode);
    setTimerTime(settings[newMode].time)
    onModeChange(newMode);
  }

  useInterval(() => {
    setTimerTime((prev) => prev - 1);
  }, run);

  useEffect(() => {
    if (timerTime <= 0) {
      setRun(null);
      onEnd(mode);
    }
  }, [timerTime]);

  return (
    <div className="timer" style={{backgroundColor: settings[mode].color}}>
      <div className="timer__ticker" onClick={handleClickTimer}>
        {secondsToFormatTime(timerTime)}
      </div>
      <div className="timer__buttons">
        <Button slug={settings.work.slug} mode={mode} handleClick={modeChange}>Work</Button>
        <Button slug={settings.break.slug} mode={mode} handleClick={modeChange}>Break</Button>
        <Button slug={settings.longBreak.slug} mode={mode} handleClick={modeChange}>Long Break</Button>
      </div>
    </div>
  );
}

export default Timer;