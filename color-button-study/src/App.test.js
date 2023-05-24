import { render, screen } from '@testing-library/react';
import App from './App';

import { logRoles } from '@testing-library/dom';

test('버튼이 올바른 초기 색상을 가지고 있는 경우. button has correct initail color', () => {
  const {container} = render( <App />);
  logRoles(container);

  const colorButton = screen.getByRole('button', { name: 'Change to blue color'});

  // expect the background color to be purple
  expect(colorButton).toHaveStyle({"background-color": "purple"})
});
