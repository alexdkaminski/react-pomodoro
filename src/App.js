import React, { useState, useEffect } from 'react';
import './tailwind.output.css';
import TimerDisplay from './components/timerDisplay'

function App() {
  const initialSeconds = 1500
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [isStarted, setIsStarted] = useState(false)

  const toggle = () => {
    setIsStarted(!isStarted)
  }

  const reset = () => {
    setSecondsLeft(initialSeconds)
    setIsStarted(false)
  }

  useEffect(() => {
    let interval = null
    if (isStarted) {
      interval = setInterval(() => {
        let newSecondsLeft = secondsLeft - 1
        setSecondsLeft(newSecondsLeft)
      }, 1000)
    } else if (!isStarted && secondsLeft !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isStarted, secondsLeft])


  return (
    <div className="bg-gray-700">
      <div className="flex h-screen">
        <div className="m-auto">
          <TimerDisplay secondsLeft={secondsLeft}/>
          <button onClick={toggle}>{isStarted ? 'Stop' : 'Start'}</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
