import React, { useState, useEffect } from 'react';
import './tailwind.output.css';

function App() {
  const [secondsLeft, updateSecondsLeft] = useState(1500)
  const [started, updateStarted] = useState(false)

  const [minutesLeftDisplay, updateMinutesLeftDisplay] = useState(25)
  const [secondsLeftDisplay, updateSecondsLeftDisplay] = useState('00')

  useEffect(() => {
    const interval = setInterval(() => {
      updateSecondsLeft(secondsLeft => secondsLeft - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [started])


  return (
    <div className="bg-gray-700">
      <div className="flex h-screen">
        <div className="m-auto">
          <div id="time-left" className="text-6xl text-white">
            {secondsLeft}
            {/* {minutesLeftDisplay}:{secondsLeftDisplay} */}
          </div>
          <button onClick={() => updateStarted(true)}>Start</button>
        </div>
      </div>
    </div>
  );
}

export default App;
