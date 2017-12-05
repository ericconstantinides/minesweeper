import React from 'react'

const Square = props => {
  // statuses: mine, swept, unswept, flag
  const mineClass = props.mine ? 'is-mine' : 'not-mine'
  const sweptClass = props.swept ? 'is-swept' : 'not-swept'
  const flagClass = props.flag ? 'is-flag' : 'not-flag'
  return (
    <div className={`Square ${mineClass} ${sweptClass} ${flagClass}`}>
      <div className='Square__inner'>
        {props.minesNearby > 0 &&
          <span className={`Square__helper has-${props.minesNearby}`}>
            {props.minesNearby}
          </span>}
      </div>
    </div>
  )
}

export default Square
