import React from 'react'

const Square = props => {
  const { x, y, mine, minesNearby, swept, sweepDelay, flag, xpldCoords } = props
  // statuses: mine, swept, unswept, flag
  const mineClass = mine && swept ? ' is-mine' : ''
  const delayClass = swept ? ' has-delay-' + sweepDelay : ''
  const sweptClass = swept ? ' is-swept' : ' not-swept'
  const flagClass = flag ? ' is-flag' : ''
  const explodingClass = xpldCoords.x === x && xpldCoords.y === y
    ? ' is-exploding'
    : ''
  return (
    <button
      onClick={props.handleSquareClick({ x, y })}
      onContextMenu={props.handleSquareRightClick({ x, y })}
      onMouseDown={props.handleSquareMouseDown({ x, y })}
      onMouseUp={props.handleSquareMouseUp({ x, y })}
      className={`Square${mineClass}${delayClass}${sweptClass}${flagClass}${explodingClass}`}
    >
      <div className='Square__inner'>
        {swept &&
          minesNearby > 0 &&
          <span className={`Square__helper has-${minesNearby}`}>
            {minesNearby}
          </span>}
      </div>
    </button>
  )
}

export default Square
