import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { TIMER_REMAINING_KEY } from '../../../utils/constants';
import Time from '../Time/Time';

function Ticker({ keyProp, isPlaying, time, size, onComplete }) {
  return (
    <div className="timer__ticker">
      <CountdownCircleTimer
        key={keyProp}
        size={size}
        trailColor={'transparent'}
        strokeWidth={4}
        isPlaying={isPlaying}
        duration={time}
        colors="#FE6F6B"
        initialRemainingTime={
          +localStorage.getItem(TIMER_REMAINING_KEY) || time // Если в LS есть запись о прошлом запуске таймера, то подставим остаток времени. Значение должно быть типа Number!
        }
        onComplete={onComplete}
      >
        {Time}
      </CountdownCircleTimer>
    </div>
  );
}

export default Ticker;