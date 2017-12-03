import React, { Component } from 'react'

class ResetButton extends Component {
  render () {
    return (
      <div className='ResetButton__container'>
        <div className='ResetButton ResetButton--sunglasses-face'>
          <div className='ResetButton__inner'>
            <span className='ResetButton__left-eye' />
            <span className='ResetButton__right-eye' />
            <span className='ResetButton__mouth' />
          </div>
        </div>
      </div>
    )
  }
}

export default ResetButton
