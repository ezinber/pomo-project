import React from 'react';
import TimerControlButton from '../TimerControlButton/TimerControlButton';
import pauseIcon from '../../../assets/icons/pause.svg';
import playIcon from '../../../assets/icons/play.svg';
import resetIcon from '../../../assets/icons/reset.svg';
import './timer-control.css';

function TimerControl({ isPlaying, pause, start, stop, wasStarted }) {
  return (
    <div className="timer__control">
      {isPlaying ? (
        <TimerControlButton onClick={pause} action="pause" icon={pauseIcon} />
      ) : wasStarted ? (
        <>
          <TimerControlButton onClick={start} action="resume" icon={playIcon} />
          <TimerControlButton onClick={stop} action="stop" icon={resetIcon} />
        </>
      ) : (
        <TimerControlButton onClick={start} action="start" icon={playIcon} />
      )}
    </div>
  );
}

export default TimerControl;
