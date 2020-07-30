import React from 'react'
import bell from '../assets/bell.mp3'

const Beep = ({ forwardedRef }) => {

  return (
    <audio id="beep" ref={forwardedRef} src={bell}></audio>
  )
}

export default Beep