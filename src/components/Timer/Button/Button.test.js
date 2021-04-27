import React from 'react';
import { render } from '@testing-library/react';
import {shallow} from 'enzyme';
import Button from './Button';

describe('Кнопка таймера', () => {
  test('Кнопка рендерится с переданным текстом', () => {
    const {getByText} = render(<Button>button inner text</Button>);
    const button = getByText(/^(button inner text)$/g);
    expect(button).toBeInTheDocument();
  });

  test('В колбек передается правильный тип', () => {
    const testType = 'testType';
    const testState = {type: null};
    const testCallback = slug => testState.type = slug;

    const button = shallow(<Button slug={testType} handleClick={testCallback} />);
    button.simulate('click');

    expect(testState.type).toEqual(testType);
  })

  test('Кнопка активна', () => {
    const slug = 'work';
    const mode = 'work';

    const button = shallow(<Button slug={slug} mode={mode} />);
    expect(button.find('button')).toHaveClassName('timer__button_active');
  })

  test('Кнопка не активна', () => {
    const slug = 'work';
    const mode = 'break';

    const button = shallow(<Button slug={slug} mode={mode} />);
    expect(button.find('button')).not.toHaveClassName('timer__button_active');
  })
});