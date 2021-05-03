import React, { useContext, useEffect, useRef, useState } from 'react';
import { TIMER_REMAINING_KEY } from '../../utils/constants';
import { TimerContext } from '../../contexts/timerContext';
import Ticker from './Ticker/Ticker';
import TimerControl from './TimerControl/TimerControl';
import ModeButton from './ModeButton/ModeButton';
import Popup from '../Popup/Popup';
import ring from '../../assets/audio/ring.mp3';
import './timer.css';

function Timer({ onPause, onStart, onEnd, onStop, onModeChange }) {
  const [showConfirmStop, setShowConfirmStop] = useState(false);
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const ringRef = useRef();
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
    ringRef.current.play();
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
    setShowConfirmStop(true);
  };

  const stopTimer = () => {
    closeConfirm();
    onStop(executing);
    stop();
  };

  const handleModeChange = (slug) => {
    onModeChange(slug);
    changeMode(slug);
  };

  const handleResize = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  const closeConfirm = () => {
    setShowConfirmStop(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="timer">
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
      <Ticker
        onComplete={handleTimeOut}
        time={timerTime}
        isPlaying={isPlaying}
        size={windowSize.width > 439 && windowSize.height > 685 ? 250 : 220}
        keyProp={timerKey}
      />
      <TimerControl
        isPlaying={isPlaying}
        start={handleClickStart}
        pause={handleClickPause}
        stop={handleClickStop}
        wasStarted={wasStarted}
      />
      <audio src={ring} ref={ringRef} />
      <Popup opened={showConfirmStop} onClose={closeConfirm}>
        <h2 className="popup__title">Остановить таймер?</h2>
        <div className="popup__actions">
          <button
            type="button"
            className="popup__button popup__button_type_cancel"
            onClick={closeConfirm}
          >
            Отменить
          </button>
          <button
            type="button"
            className="popup__button popup__button_type_apply"
            onClick={stopTimer}
          >
            Остановить
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default Timer;
