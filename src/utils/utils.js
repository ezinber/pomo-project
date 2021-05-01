export const secondsToFormatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  const minutesString = m < 10 ? `0${m}` : m;
  const secondsString = s < 10 ? `0${s}` : s;

  return `${minutesString}:${secondsString}`
}

export const minutesToSeconds = (min) => min * 60;