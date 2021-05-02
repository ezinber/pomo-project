import { createContext } from 'react';
import { minutesToSeconds } from '../utils/utils';

const SettingsContext = createContext({
  timer: {
    work: {
      time: minutesToSeconds(0.3),
      slug: 'work',
    },
    shortBreak: {
      time: minutesToSeconds(0.1),
      slug: 'shortBreak',
    },
    longBreak: {
      time: minutesToSeconds(0.2),
      slug: 'longBreak',
    },
  },
});

export default SettingsContext;
