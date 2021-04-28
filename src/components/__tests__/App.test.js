import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';

test('Приложение рендерится без падения', () => {
  const app = shallow(<App />)
  expect(app).toExist();
})