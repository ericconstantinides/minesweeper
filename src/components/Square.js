import React from 'react'

const Square = props => {
  // statuses: mine, swept, unswept, flag
  const mineClass = props.mine && props.swept ? ' is-mine' : ''
  const sweepDelay = props.swept ? ' has-delay-' + props.sweepDelay : ''
  const sweptClass = props.swept ? ' is-swept' : ' not-swept'
  const flagClass = props.flag ? ' is-flag' : ''
  const { x, y, explosionCoords } = props
  const explodingClass = explosionCoords.x === x && explosionCoords.y === y
    ? ' is-exploding'
    : ''
  return (
    <button
      onClick={props.handleSquareClick({ x, y })}
      onContextMenu={props.handleSquareRightClick({ x, y })}
      onMouseDown={props.handleSquareMouseDown({ x, y })}
      onMouseUp={props.handleSquareMouseUp({ x, y })}
      className={`Square${mineClass}${sweepDelay}${sweptClass}${flagClass}${explodingClass}`}
    >
      <div className='Square__inner'>
        {props.swept &&
          props.minesNearby > 0 &&
          <span className={`Square__helper has-${props.minesNearby}`}>
            {props.minesNearby}
          </span>}
      </div>
    </button>
  )
}

export default Square
