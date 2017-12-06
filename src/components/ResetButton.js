import React, { Component } from 'react'

class ResetButton extends Component {
  render () {
    return (
      <div className='ResetButton__container'>
        <button
          className={`ResetButton XXis-pressed ${this.props.resetButtonClass}`}
          onClick={this.props.handleResetClick}
        >
          <div className='ResetButton__inner' />
        </button>
      </div>
    )
  }
}

export default ResetButton
