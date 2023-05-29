import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [buttonColor, setButtonColor] = useState('purple');
  const newButtonColor = buttonColor === 'purple' ? 'blue' : 'purple';

  return (
    <div>
      <button
        style = {{'background-color': buttonColor}}
        onClick ={()=> { setButtonColor(newButtonColor)} }
      >Change to {newButtonColor} color</button>
      <input type="checkbox"/>
    </div>
  );
}

export default App;
