import { createContext } from 'react';
import { minutesToSeconds } from '../utils/utils';

const SettingsContext = createContext({
  timer: {
    work: {
      time: minutesToSeconds(25),
      slug: 'work',
    },
    shortBreak: {
      time: minutesToSeconds(5),
      slug: 'shortBreak',
    },
    longBreak: {
      time: minutesToSeconds(15),
      slug: 'longBreak',
    },
  },
});

export default SettingsContext;
