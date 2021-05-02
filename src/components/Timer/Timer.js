import React, { useContext } from 'react';
import { TIMER_REMAINING_KEY } from '../../utils/constants';
import { TimerContext } from '../../contexts/timerContext';
import Ticker from './Ticker/Ticker';
import TimerControl from './TimerControl/TimerControl';
import ModeButton from './ModeButton/ModeButton';
import './timer.css';

function Timer({ onPause, onStart, onEnd, onStop, onModeChange }) {
  const {
    isPlaying,
    timerTime,
    changeMode,
    start,
    pause,
    stop,
    timerKey,
    executing,
  } = useContext(TimerContext);
  const wasStarted = !!localStorage.getItem(TIMER_REMAINING_KEY);

  const handleTimeOut = () => {
    onEnd(executing);
  };

  const handleClickPause = () => {
    onPause(executing);
    pause();
  };

  const handleClickStart = () => {
    onStart(executing);
    start();
  };

  const handleClickStop = () => {
    onStop(executing);
    stop();
  };

  const handleModeChange = (slug) => {
    onModeChange(slug);
    changeMode(slug);
  };

  return (
    <div className="timer">
      <div className="timer__mods">
        <ul className="mods">
          <ModeButton title="Work" slug="work" onClick={handleModeChange} />
          <ModeButton
            title="Short Break"
            slug="shortBreak"
            onClick={handleModeChange}
          />
          <ModeButton
            title="Long Break"
            slug="longBreak"
            onClick={handleModeChange}
          />
        </ul>
      </div>
      <Ticker
        onComplete={handleTimeOut}
        time={timerTime}
        isPlaying={isPlaying}
        size={250}
        keyProp={timerKey}
      />
      <TimerControl
        isPlaying={isPlaying}
        start={handleClickStart}
        pause={handleClickPause}
        stop={handleClickStop}
        wasStarted={wasStarted}
      />
    </div>
  );
}

export default Timer;
