import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Square from './Square'

class Board extends Component {
  handleSquareClick = coords => event => {
    event.preventDefault()
    const { status, board, squaresSwept } = this.props.game
    // ignore click if square is swept, flagged, or (Not Playing and Not Ready)
    if (
      board[coords.x][coords.y].isSwept ||
      board[coords.x][coords.y].isFlag ||
      (status !== 'playing' && status !== 'ready')
    ) {
      return
    }
    if (squaresSwept === 0) {
      // start the timer
      this.props.startGame()
    }
    this.props.clickSquare(this.props.game, coords)
  }
  handleSquareRightClick = coords => event => {
    event.preventDefault()
    const { status, board } = this.props.game
    if (
      board[coords.x][coords.y].isSwept ||
      (status !== 'playing' && status !== 'ready')
    ) {
      return
    }
    this.props.toggleFlag(this.props.game, coords)
  }
  renderBoard () {
    if (!(this.props.game && this.props.game.board)) return
    let renderedBoard = []
    const { board, settings: { xMax, yMax } } = this.props.game
    // we have to lay it out in y, x order:
    for (let y = 0; y <= yMax; y++) {
      let row = []
      for (let x = 0; x <= xMax; x++) {
        row.push(
          <Square
            swept={board[x][y].isSwept}
            sweepDelay={board[x][y].sweepDelay}
            handleSquareClick={this.handleSquareClick}
            handleSquareRightClick={this.handleSquareRightClick}
            handleSquareMouseDown={this.props.handleSquareMouseDown}
            handleSquareMouseUp={this.props.handleSquareMouseUp}
            mine={board[x][y].isMine}
            flag={board[x][y].isFlag}
            xpldCoords={this.props.game.explosionCoords}
            minesNearby={board[x][y].minesNearby}
            key={x + ',' + y}
            x={x}
            y={y}
          />
        )
      }
      renderedBoard.push(<div key={y} className='Board__row'>{row}</div>)
    }
    return renderedBoard
  }
  render () {
    if (!this.props.game) {
      return (
        <div className='Board'>
          <div className='Board__inner'>
            Laying Mines...
          </div>
        </div>
      )
    }
    return (
      <div className='Board'>
        <div className='Board__inner'>
          {this.renderBoard()}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ game }) {
  return { game }
}

export default connect(mapStateToProps, actions)(Board)
