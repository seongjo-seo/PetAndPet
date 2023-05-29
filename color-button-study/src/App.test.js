import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('버튼의 초기 색상과 문구가 올바르게 있는지. 가지고 있다면 클릭했을 때 업데이트 되는 경우.', () => {
  render( <App />);

  // 버튼과 텍스트가 올바르게 '파란색으로 변경' 있는 요소 찾기.
  const colorButton = screen.getByRole('button', { name: 'Change to blue color' });

  // 배경 초기 색이 보라색인지.
  expect(colorButton).toHaveStyle({"background-color": "purple"});

  // 버튼 클릭시. | click button
  fireEvent.click(colorButton);

  // 버튼 클릭 후. 배경색이 파란색인 경우. | expect the backgorund color to be blue
  expect(colorButton).toHaveStyle({ "background-color": "blue"});

  // 버튼 클릭 후. 텍스트가 보라색이 됐는지. | expect the button text to be 
  expect(colorButton).toHaveTextContent("Change to purple");
});

test('초기화 조건', () =>{
  render(<App/>);

  // 버튼이 활성화된 상태로 시작됐는지 확인.
  const colorButton = screen.getByRole('button', {name : 'Change to blue color'});
  expect(colorButton).toBeEnabled();

  // 체크 박스가 체크되지 않은 상태로 시작했는지 확인.
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
})