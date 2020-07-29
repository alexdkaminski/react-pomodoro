import React from 'react'

const TimerDisplay = ({ secondsLeft }) => {

  const calcMinutesDisplay = () => {
    if (secondsLeft === 3600) {
      return 60
    } else {
      const minutes = Math.floor((secondsLeft / 60) % 60)
      if (minutes <= 9) {
        return `0${minutes}`
      } else {
        return minutes
      }
    }
  }

  const calcSecondsDisplay = () => {
    const secondsInMinute = Math.floor((secondsLeft) % 60)
    console.log(secondsInMinute)
    if (secondsInMinute >= 0 && secondsInMinute <= 9) {
      return `0${secondsInMinute}`
    } else if ((secondsInMinute >= 10 && secondsInMinute <= 59 )) {
      return secondsInMinute
    } else {
      return `00`
    }
  }
  
  const minutesDisplay = calcMinutesDisplay()

  const secondsDisplay = calcSecondsDisplay()
  
  return (
    <div id="time-left" className="text-white text-center text-10xl -my-8">
      {minutesDisplay}:{secondsDisplay}
    </div>
  )
}

export default TimerDisplay