import React, { useEffect, useRef, useState } from 'react';
import { secondsToFormatTime } from '../../utils/utils';
import useInterval from '../../hooks/useInterval';
import useLocalStorage from '../../hooks/useLocalStorage';
import Button from './Button';
import ring from '../../assets/audio/ring.mp3';
import './timer.css';

function Timer({ settings, onEnd, onStart, onPause, onModeChange }) {
  const [mode, setMode] = useLocalStorage('mode', settings.work);
  const [run, setRun] = useState(null);
  const [timerTime, setTimerTime] = useLocalStorage('timer', settings.work.time);
  const ringElement = useRef();

  const handleClickTimer = () => {
    if (run) {
      onPause(mode);
      setRun(null);
    } else {
      if (timerTime === 0) {
        setTimerTime(mode.time);
      }
      onStart(mode);
      setRun(1000);
    }
  }

  const modeChange = (newMode) => {
    setRun(null);
    setMode(newMode);
    setTimerTime(newMode.time)
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
    <div className="timer" style={{backgroundColor: mode.color}}>
      <div className="timer__ticker">
        <div 
          className="timer__time"
          onClick={handleClickTimer}
          style={{
            color: mode.color,
            borderColor: mode.color
          }}
        >
          {secondsToFormatTime(timerTime)}
        </div>
      </div>
      <div className="timer__buttons">
        {
          Object
            .keys(settings)
            .map(m => (
              <Button
                key={m}
                settings={settings[m]}
                mode={mode}
                handleClick={modeChange}
              >{settings[m].text}</Button>
            ))
        }
      </div>
      <div className="timer__ring">
        <audio src={ring} ref={ringElement} />
      </div>
    </div>
  );
}

export default Timer;