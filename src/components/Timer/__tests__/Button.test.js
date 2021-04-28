import React from 'react';
import { render } from '@testing-library/react';
import {shallow} from 'enzyme';
import Button from '../Button';

const defaultSettings = {
  slug: 'slug',
  color: '#fff',
};

describe('Кнопка таймера', () => {
  test('Кнопка рендерится с переданным текстом', () => {
    const currentMode = { slug: 'slug', color: '#fff' };
    const {getByText} = render(
      <Button
        settings={defaultSettings}
        mode={currentMode}
      >
        button inner text
      </Button>
    );
    const button = getByText(/^(button inner text)$/g);

    expect(button).toBeInTheDocument();
  });

  test('В колбек передается правильный тип', () => {
    const currentMode = { slug: 'slug', color: '#fff' };
    const testState = {type: null};
    const testCallback = ({ slug }) => testState.type = slug;

    const button = shallow(
      <Button
        mode={currentMode}
        settings={defaultSettings}
        handleClick={testCallback}
      />
    );
    button.simulate('click');

    expect(testState.type).toEqual(defaultSettings.slug);
  })

  test('Кнопка активна', () => {
    const currentMode = { slug: 'work', color: '#fff' };
    const settings = { slug: 'work', color: '#fff' };
    const button = shallow(
      <Button
        settings={settings}
        mode={currentMode}
      />
    );
    expect(button.find('button'))
      .toHaveClassName('timer__button_active');
  })

  test('Кнопка не активна', () => {
    const settings = { slug: 'work', color: '#fff' };
    const mode = { slug: 'break', color: '#fff' };

    const button = shallow(
      <Button
        settings={settings}
        mode={mode}
      />
    );
    expect(button.find('button'))
      .not.toHaveClassName('timer__button_active');
  })
});