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
      <div className="timer__ticker" onClick={handleClickTimer}>
        {secondsToFormatTime(timerTime)}
      </div>
      <div className="timer__buttons">
        <Button slug={settings.work.slug} mode={mode} handleClick={modeChange}>Work</Button>
        <Button slug={settings.break.slug} mode={mode} handleClick={modeChange}>Break</Button>
        <Button slug={settings.longBreak.slug} mode={mode} handleClick={modeChange}>Long Break</Button>
      </div>
      <div>
        <audio src={ring} ref={ringElement} />
      </div>
    </div>
  );
}

export default Timer;