import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Square from './Square'

class Board extends Component {
  componentDidMount () {
    this.props.createGame(20, 10, 10)
  }
  handleSquareClick = coords => event => {
    const {x, y} = coords
    console.log({x, y})
    this.props.clickSquare(this.props.game, coords)
  }
  renderBoard () {
    if (!(this.props.game && this.props.game.board)) return
    let renderedBoard = []
    const { board, size: {xMax, yMax} } = this.props.game
    for (let y = 0; y <= yMax; y++) {
      let row = []
      for (let x = 0; x <= xMax; x++) {
        row.push(
          <Square
            swept={board[x][y].isSwept}
            handleSquareClick={this.handleSquareClick}
            mine={board[x][y].isMine}
            minesNearby={board[x][y].minesNearby}
            key={x.toString() + ',' + y.toString()}
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
            GENERATING GAME
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
