import React, { Component } from 'react'
import Square from './Square'

class Board extends Component {
  renderBoardRow = () => {
    return (
      <div className='Board__row'>
        <Square swept />
        <Square />
        <Square />
        <Square />
        <Square flag />
        <Square swept />
        <Square swept mine />
    </div>
    )
  }
  render () {
    return (
      <div className='Board'>
        <div className='Board__inner'>
          {this.renderBoardRow()}
          {this.renderBoardRow()}
          {this.renderBoardRow()}
          {this.renderBoardRow()}
          {this.renderBoardRow()}
        </div>
      </div>
    )
  }
}

export default Board
