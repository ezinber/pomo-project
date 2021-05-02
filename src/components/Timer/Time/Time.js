import React, { useRef, useState } from 'react';
import { TIMER_REMAINING_KEY } from '../../../utils/constants';
import './time.css';

function leaderZero(num) {
  return num < 10 ? '0' + num : num;
}

function Time({ remainingTime }) {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const [, setOneLastRerender] = useState(0);

  const currentSeconds = useRef(seconds);
  const currentMinutes = useRef(minutes);
  const prevSeconds = useRef(null);
  const prevMinutes = useRef(null);
  const isNewSecondsFirstTick = useRef(false);
  const isNewMinutesFirstTick = useRef(false);

  if (currentSeconds.current !== seconds) {
    isNewSecondsFirstTick.current = true;
    prevSeconds.current = currentSeconds.current;
    currentSeconds.current = seconds;
    localStorage.setItem(TIMER_REMAINING_KEY, remainingTime);
  } else {
    isNewSecondsFirstTick.current = false;
  }

  if (currentMinutes.current !== minutes) {
    isNewMinutesFirstTick.current = true;
    prevMinutes.current = currentMinutes.current;
    currentMinutes.current = minutes;
  } else {
    isNewMinutesFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
      localStorage.removeItem(TIMER_REMAINING_KEY);
    }, 20);
  }

  const isSecondsUp = isNewSecondsFirstTick.current;
  const isMinutesUp = isNewMinutesFirstTick.current;

  if (remainingTime === 0) {
    return <div>Time is Out</div>;
  }

  return (
    <div className="time-ticker">
      <div className="time-ticker__time">
        <span
          key={minutes}
          className={`time-ticker__digit time-ticker__digit_type_minutes ${
            isMinutesUp && 'time-ticker__digit_slide_up'
          }`}
        >
          {leaderZero(minutes)}
        </span>
        {prevMinutes.current !== null && (
          <span
            key={prevMinutes.current}
            className={`time-ticker__digit time-ticker__digit_type_minutes ${
              !isMinutesUp && 'time-ticker__digit_slide_down'
            }`}
          >
            {leaderZero(prevMinutes.current)}
          </span>
        )}
      </div>
      :
      <div className="time-ticker__time">
        <span
          key={seconds}
          className={`time-ticker__digit time-ticker__digit_type_seconds ${
            isSecondsUp && 'time-ticker__digit_slide_up'
          }`}
        >
          {leaderZero(seconds)}
        </span>
        {prevSeconds.current !== null && (
          <span
            key={prevSeconds.current}
            className={`time-ticker__digit time-ticker__digit_type_seconds ${
              !isSecondsUp && 'time-ticker__digit_slide_down'
            }`}
          >
            {leaderZero(prevSeconds.current)}
          </span>
        )}
      </div>
    </div>
  );
}

export default Time;
