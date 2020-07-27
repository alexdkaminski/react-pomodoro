import React from 'react'

const TimerDisplay = ({ secondsLeft }) => {

  const minutesDisplay = Math.floor((secondsLeft / 60) % 60)

  const calcSecondsDisplay = () => {
    const secondsInMinute = Math.floor((secondsLeft) % 60)
    console.log(secondsInMinute)
    if (secondsInMinute >= 0 && secondsInMinute <= 9) {
      return (
        `0${secondsInMinute}`
      )
    } else if ((secondsInMinute >= 10 && secondsInMinute <= 59 )) {
      return (
        secondsInMinute
      )
    } else {
      return (
        `00`
      )
    }
  }
  

  const secondsDisplay = calcSecondsDisplay()
  
  return (
    <div id="time-left" className="text-6xl text-white">
      <span>{minutesDisplay}:{secondsDisplay}</span>
    </div>
  )
}

export default TimerDisplay