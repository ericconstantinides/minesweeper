import React from 'react'
import { padString } from '../lib/helperFunctions'

const FlagCounter = props => {
  return (
    <div className='FlagCounter timer'>
      <div className='timer__inner'>
        {padString(props.flagsAvailable)}
      </div>
    </div>
  )
}

export default FlagCounter
