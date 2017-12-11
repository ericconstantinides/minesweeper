import React, { Component } from 'react'
import { padString } from '../lib/helperFunctions'

class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: null,
      counter: 0
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // start the timer (we start the timer at 1 second instead of 0 seconds):
    if (prevProps.status !== 'playing' && this.props.status === 'playing') {
      let timer = setInterval(this.tick, 1000)
      this.setState({timer, counter: 1})
    }
    // stop the timer:
    if (prevProps.status === 'playing' && this.props.status !== 'playing') {
      clearInterval(this.state.timer)
    }
    // reset the timer:
    if (prevProps.status !== 'ready' && this.props.status === 'ready') {
      this.setState({counter: 0})
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
