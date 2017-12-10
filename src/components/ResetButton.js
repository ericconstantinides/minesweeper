import React from 'react'

const ResetButton = props => {
  return (
    <div className='ResetButton__container'>
      <button
        className={`ResetButton ${props.resetButtonClass}`}
        onClick={props.handleResetClick}
      >
        <div className='ResetButton__inner' />
      </button>
    </div>
  )
}

export default ResetButton
