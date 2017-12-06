import React, { Component } from 'react'

class Timer extends Component {
  state = {
    timer: null,
    counter: 0
  }
  stringifyTimer = (time, size = 3) => {
    time = time.toString()
    return time.length < size ? this.stringifyTimer('0' + time, size) : time
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
    const stringTimer = this.stringifyTimer(this.state.counter)
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
