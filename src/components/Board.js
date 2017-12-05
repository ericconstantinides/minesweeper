import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Square from './Square'

class Board extends Component {
  componentDidMount () {
    this.props.createGame(10, 10, 15)
  }
  renderBoard () {
    if (!(this.props.game && this.props.game.board)) return
    let renderedBoard = []
    const { board } = this.props.game
    for (let x = 0; x < board.length; x++) {
      let row = []
      for (let y = 0; y < board[x].length; y++) {
        row.push(
          <Square
            swept
            mine={board[x][y].isMine}
            minesNearby={board[x][y].minesNearby}
            key={x.toString() + ',' + y.toString()}
          />
        )
      }
      renderedBoard.push(<div key={x} className='Board__row'>{row}</div>)
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
