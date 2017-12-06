import React, { Component } from 'react'
import { padString } from '../lib/helperFunctions'

class FlagCounter extends Component {
  render () {
    return (
      <div className='FlagCounter timer'>
        <div className='timer__inner'>
          {padString(this.props.flagsAvailable)}
        </div>
      </div>
    )
  }
}

export default FlagCounter
