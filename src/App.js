import React, { useState, useEffect } from 'react';
import './tailwind.output.css';
import TimerDisplay from './components/timerDisplay'

function App() {
  const [timerStatus, setTimerStatus] = useState('Session')
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [secondsLeft, setSecondsLeft] = useState(sessionLength * 60)
  const [isStarted, setIsStarted] = useState(false)

  const toggle = () => {
    setIsStarted(!isStarted)
  }

  const reset = () => {
    setSecondsLeft(sessionLength * 60)
    setIsStarted(false)
  }

  const sessionIncrement = () => {
    const newSessionLength = sessionLength + 1
    if (sessionLength <= 59) {
      setSessionLength(newSessionLength)
      setSecondsLeft(newSessionLength * 60)
    }
  }

  const sessionDecrement = () => {
    const newSessionLength = sessionLength - 1
    setSessionLength(newSessionLength)
    setSecondsLeft(newSessionLength * 60)
  }

  const breakIncrement = () => {
    const newBreakLength = breakLength + 1
    if (breakLength <= 59) {
      setBreakLength(newBreakLength)
    }
  }

  const breakDecrement = () => {
    const newBreakLength = breakLength - 1
    setBreakLength(newBreakLength)
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
          <div id="timer-label" className="text-center text-2xl text-white">{timerStatus}</div>
          <TimerDisplay secondsLeft={secondsLeft}/>
          
          <div className="flex p-2 mb-8">
            <button id="start_stop" onClick={toggle} className="p-2 bg-white mx-2 w-1/2">{isStarted ? 'Stop' : 'Start'}</button>
            <button id="reset" onClick={reset} className="p-2 bg-white mx-2 w-1/2">Reset</button>
          </div>
          <div className="flex text-gray-400">
            <div className="text-center mx-4 w-1/2">
              <div id="session-increment" onClick={sessionIncrement}>▲</div>
              <div id="session-length" className="text-4xl">{sessionLength}</div>
              <div id="session-label">Session</div>
              <div id="session-decrement" onClick={sessionDecrement}>▼</div>
            </div>
            <div className="text-center mx-4 w-1/2">
              <div id="break-increment" onClick={breakIncrement}>▲</div>
              <div id="break-length" className="text-4xl text-gray-400">{breakLength}</div>
              <div id="break-label" className="text-gray-400">Break</div>
              <div id="break-decrement" onClick={breakDecrement}>▼</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
