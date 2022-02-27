import React from 'react'

const Alarm = React.forwardRef((_, ref) => {
  return (
    <div>
        <audio ref={ref}>
            <source src='/alarm.mp3' type='audio/mp3'/>
            Your browser does not support the audio element.
        </audio>
    </div>
  )
});

export default Alarm