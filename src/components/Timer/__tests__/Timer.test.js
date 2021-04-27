import React from 'react';
import { render } from '@testing-library/react';
import {shallow} from 'enzyme';
import Timer from '../Timer';

const settings = {
  work: {
    time: 25,
    color: '#F55A5A',
    slug: 'work',
  },
  break: {
    time: 5,
    color: '#4ea6e7',
    slug: 'break',
  },
  longBreak: {
    time: 15,
    color: '#524fe1',
    slug: 'longBreak',
  },
}

describe('Таймер', () => {
  test('Выполняется рендеринг без падения', () => {
    const component = shallow(<Timer settings={settings} />)
    expect(component.find('.timer')).toExist();
  })

  test('Тикер имеет корректное значение', () => {
    const component = shallow(<Timer settings={settings} />)
    const ticker = component.find('.timer__ticker');
    expect(ticker).toIncludeText(':');
    expect(ticker).not.toIncludeText('NaN');
  })

  test('Выполняется рендеринг переключателей режимов', () => {
    const { getByText } = render(<Timer settings={settings} />);
    const workButton = getByText(/Work/i);
    const breakButton = getByText(/^Break$/i);
    const longBreakButton = getByText(/^(Long Break)$/i);

    expect(workButton).toBeInTheDocument();
    expect(breakButton).toBeInTheDocument();
    expect(longBreakButton).toBeInTheDocument();
  })
})