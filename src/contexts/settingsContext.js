import {createContext} from 'react';
import { minutesToSeconds } from '../utils/utils';

const SettingsContext = createContext({
  timer: {
    work: {
      time: minutesToSeconds(0.3),
      color: '#F55A5A',
      slug: 'work',
      text: 'Work',
    },
    break: {
      time: minutesToSeconds(0.1),
      color: '#4ea6e7',
      slug: 'break',
      text: 'Break',
    },
    longBreak: {
      time: minutesToSeconds(0.2),
      color: '#524fe1',
      slug: 'longBreak',
      text: 'Long Break',
    },
  },
});

export default SettingsContext;