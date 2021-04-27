import React from 'react';
import { render } from '@testing-library/react';
import {shallow} from 'enzyme';
import Timer from '../Timer';

describe('Таймер', () => {
  test('Выполняется рендеринг без падения', () => {
    const component = shallow(<Timer />)
    expect(component.find('.timer')).toExist();
  })

  test('Тикер имеет корректное значение', () => {
    const component = shallow(<Timer />)
    const ticker = component.find('.timer__ticker');
    expect(ticker).toIncludeText(':');
    expect(ticker).not.toIncludeText('NaN');
  })

  test('Выполняется рендеринг переключателей режимов', () => {
    const { getByText } = render(<Timer />);
    const workButton = getByText(/Work/i);
    const breakButton = getByText(/^Break$/i);
    const longBreakButton = getByText(/^(Long Break)$/i);

    expect(workButton).toBeInTheDocument();
    expect(breakButton).toBeInTheDocument();
    expect(longBreakButton).toBeInTheDocument();
  })
})