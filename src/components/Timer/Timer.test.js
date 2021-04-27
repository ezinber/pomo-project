import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Timer from './Timer';

describe('Таймер', () => {
  test('Выполняется рендеринг компонента', () => {
    const { getByText } = render(<Timer />);
    const workButton = getByText(/Work/i);
    const breakButton = getByText(/^Break$/i);
    const longBreakButton = getByText(/^(Long Break)$/i);

    expect(workButton).toBeInTheDocument();
    expect(breakButton).toBeInTheDocument();
    expect(longBreakButton).toBeInTheDocument();
  })
})