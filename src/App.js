
import { useEffect, useState } from 'react';
import './App.css';

import classes from './components/clock.module.css';
import { getTime } from './components/numbers/getTime';

function App() {

  const [initialValue, setInintialValue] = useState(90);

  const [timeLeft, setTimeLeft] = useState(initialValue * 60);
  const [count, setCount] = useState(false);

  const hours = getTime(Math.floor( timeLeft / 3600));
  const minutes = getTime(Math.floor((timeLeft / 60) - hours * 60));
  const seconds = getTime(timeLeft - minutes * 60 + minutes * 60);

  useEffect(() => {
    setTimeLeft(initialValue * 60);
    
  }, [initialValue])

  const changeInput = (e) => {
    setInintialValue(e.target.value);
  }

  const btnStart = () => {
    if (timeLeft === 0) { 
      setTimeLeft(5);
    }
    setCount(true);
  }

  const btnStop = () => {
    setCount(false);
  }

  const btnReset = () => {
    setCount(false);
    setTimeLeft(initialValue * 60);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      count && 
      setTimeLeft((timeLeft) => timeLeft >= 1 ? timeLeft - 1 : 0);
    }, 1000);
    if (timeLeft === 0) { 
      setCount(false);
    }
    return () => {
      clearInterval(interval);
    }
  }, [count]);

  return (
    <div className="App">
      <header className="App-header">
        put the number down below :D
        <input
        type="number"
        value={initialValue}
        onChange = { changeInput }
        placeholder='ВВедите значение таймера в минутах'/>
        <div>
          <div className={classes.timer}>
            <span>
              {
                timeLeft < (60 * 60) ? "00" : hours
              }
            </span>
            <span>:</span>
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
          </div>
          <div className={classes.buttons}>
            {count ? <button onClick={btnStop}>Stop</button>
              : <button onClick={btnStart}>Start</button>
            }
            <button onClick={btnReset}>Reset</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
