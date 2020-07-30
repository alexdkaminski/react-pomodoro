import React, { useState, useEffect, useRef } from 'react';
import './tailwind.output.css';
import TimerDisplay from './components/timerDisplay'
import Beep from './components/beep'

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
    setSessionLength(25)
    setSecondsLeft(25 * 60)
    setBreakLength(5)
    setIsStarted(false)
    setTimerStatus('Session')
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  const sessionIncrement = () => {
    if (sessionLength <= 59) {
      const newSessionLength = sessionLength + 1
      setSessionLength(newSessionLength)
      setSecondsLeft(newSessionLength * 60)
    }
  }

  const sessionDecrement = () => {
    if (sessionLength > 1) {
      const newSessionLength = sessionLength - 1
      setSessionLength(newSessionLength)
      setSecondsLeft(newSessionLength * 60)
    }
  }

  const breakIncrement = () => {
    if (sessionLength <= 59) {
      const newBreakLength = breakLength + 1
      if (breakLength <= 59) {
        setBreakLength(newBreakLength)
      }
    }
  }

  const breakDecrement = () => {
    if (breakLength > 1) {
      const newBreakLength = breakLength - 1
      setBreakLength(newBreakLength)
    }
  }

  const startAudio = () => {
    audioRef.current.play()
  }

  const audioRef = useRef(null)

  useEffect(() => {
    let interval = null
    if (isStarted) {
      if (secondsLeft === 0 && timerStatus === 'Session') {
        // Session finished
        console.log('session finished')
        clearInterval(interval)
        setTimerStatus('Break')
        startAudio()
        const newSecondsLeft = breakLength * 60
        setSecondsLeft(newSecondsLeft)
        interval = setInterval(() => {
          const newSecondsLeft = secondsLeft - 1
          setSecondsLeft(newSecondsLeft)
        }, 1000)
      } else if (secondsLeft === 0 && timerStatus === 'Break') {
        // Break finished
        console.log('break finished')
        clearInterval(interval)
        setTimerStatus('Session')
        startAudio()
        const newSecondsLeft = sessionLength * 60
        setSecondsLeft(newSecondsLeft)
        interval = setInterval(() => {
          const newSecondsLeft = secondsLeft - 1
          setSecondsLeft(newSecondsLeft)
        }, 1000)
      } else {
        interval = setInterval(() => {
          const newSecondsLeft = secondsLeft - 1
          setSecondsLeft(newSecondsLeft)
        }, 1000)
      }
    } else if (!isStarted && secondsLeft !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isStarted, secondsLeft, breakLength, sessionLength, timerStatus])


  return (
    <>
      <div className="bg-gray-200">
        <div className="flex h-screen">
          <div className="m-auto">
            <div className="w-96 bg-blue-600 px-6 py-6 shadow-lg rounded-lg border-white border-solid border-8">
            <div id="timer-label" className="text-center text-2xl text-white">{timerStatus}</div>
            <TimerDisplay secondsLeft={secondsLeft}/>
            <div className="flex p-2 mb-8">
              <button id="start_stop" onClick={toggle} className="p-2 bg-white mx-2 w-1/2">{isStarted ? 'Stop' : 'Start'}</button>
              <button id="reset" onClick={reset} className="p-2 bg-white mx-2 w-1/2">Reset</button>
            </div>
            <div className="flex text-gray-200">
              <div className="text-center mx-4 w-1/2">
                <div id="session-increment" onClick={sessionIncrement}>▲</div>
                <div id="session-length" className="text-4xl -my-2">{sessionLength}</div>
                <div id="session-decrement" onClick={sessionDecrement}>▼</div>
                <div id="session-label">Session</div>

              </div>
              <div className="text-center mx-4 w-1/2">
                <div id="break-increment" onClick={breakIncrement}>▲</div>
                <div id="break-length" className="text-4xl -my-2">{breakLength}</div>
                <div id="break-decrement" onClick={breakDecrement}>▼</div>
                <div id="break-label">Break</div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <Beep forwardedRef={audioRef}/>
  </>
  );
}

export default App;
