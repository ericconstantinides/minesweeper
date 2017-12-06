import React, { Component } from 'react'
import { padString } from '../lib/helperFunctions'

class Timer extends Component {
  state = {
    timer: null,
    counter: 0
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.timerActive && this.props.timerActive) {
      let timer = setInterval(this.tick, 1000)
      this.setState({timer})
    }
  }
  tick = () => {
    this.setState({counter: this.state.counter + 1})
  }
  render () {
    const stringTimer = padString(this.state.counter)
    return (
      <div className='timer'>
        <div className='timer__inner'>
          {stringTimer}
        </div>
      </div>
    )
  }
}

export default Timer
