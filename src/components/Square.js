import React from 'react'

const Square = props => {
  // statuses: mine, swept, unswept, flag
  const mineClass = props.mine ? 'is-mine' : 'not-mine'
  const sweptClass = props.swept ? 'is-swept' : 'not-swept'
  const flagClass = props.flag ? 'is-flag' : 'not-flag'
  const {x, y} = props
  return (
    <button
      onClick={props.handleSquareClick({ x, y })}
      onContextMenu={props.handleSquareRightClick({ x, y })}
      onMouseDown={props.handleSquareMouseDown({ x, y })}
      onMouseUp={props.handleSquareMouseUp({ x, y })}
      className={`Square ${mineClass} ${sweptClass} ${flagClass}`}
    >
      <div className='Square__inner'>
        {props.swept && props.minesNearby > 0 &&
          <span className={`Square__helper has-${props.minesNearby}`}>
            {props.minesNearby}
          </span>}
      </div>
    </button>
  )
}

export default Square
