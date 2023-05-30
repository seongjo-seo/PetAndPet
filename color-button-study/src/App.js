import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [ buttonColor, setButtonColor ] = useState('purple');
  const [ disabled, setDisabled ] = useState(false);

  const newButtonColor = buttonColor === 'purple' ? 'blue' : 'purple';

  return (
    <div>
      <button
        style = {{'background-color': buttonColor}}
        onClick = {()=> { setButtonColor(newButtonColor)}}
        disabled = {disabled}
        >
          Change to {newButtonColor} color</button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}/>
    </div>
  );
}

export default App;
