import React, { useEffect, useRef, useState } from 'react';
import { secondsToFormatTime } from '../../utils/utils';
import useInterval from '../../hooks/useInterval';
import useLocalStorage from '../../hooks/useLocalStorage';
import Button from './Button';
import ring from '../../assets/audio/ring.mp3';
import './timer.css';

function Timer({ settings, onEnd, onStart, onPause, onModeChange }) {
  const [mode, setMode] = useLocalStorage('mode', settings.work.slug);
  const [run, setRun] = useState(null);
  const [timerTime, setTimerTime] = useLocalStorage('timer', settings.work.time);
  const ringElement = useRef();

  const handleClickTimer = () => {
    if (run) {
      onPause(mode);
      setRun(null);
    } else {
      if (timerTime === 0) {
        setTimerTime(settings[mode].time);
      }
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
      ringElement.current.play();
      setRun(null);
      onEnd(mode);
    }
  }, [timerTime]);

  return (
    <div className="timer" style={{backgroundColor: settings[mode].color}}>
      <div className="timer__ticker">
        <div 
          className="timer__time"
          onClick={handleClickTimer}
          style={{color: settings[mode].color, borderColor: settings[mode].color}}>
          {secondsToFormatTime(timerTime)}
        </div>
      </div>
      <div className="timer__buttons">
        <Button settings={settings.work} textColor={settings[mode].color} mode={mode} handleClick={modeChange}>Work</Button>
        <Button settings={settings.break} textColor={settings[mode].color} mode={mode} handleClick={modeChange}>Break</Button>
        <Button settings={settings.longBreak} textColor={settings[mode].color} mode={mode} handleClick={modeChange}>Long Break</Button>
      </div>
      <div>
        <audio src={ring} ref={ringElement} />
      </div>
    </div>
  );
}

export default Timer;