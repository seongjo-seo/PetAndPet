import { render, screen } from '@testing-library/react';
import App from './App';

test('버튼이 올바른 초기 색상을 가지고 있는 경우. button has correct initail color', () => {
  render( <App />);

  const colorButton = screen.getByRole('button', { name: 'Change to blue color'});

  expect(colorButton).toHaveStyle({backgroundColor: 'purple'})
});
