import React, { Component } from 'react'
import { connect } from 'react-redux'

import FlagCounter from './components/FlagCounter'
import ResetButton from './components/ResetButton'
import Timer from './components/Timer'
import Board from './components/Board'

import * as actions from './actions'

class App extends Component {
  state = {
    resetButtonClass: ''
  }
  componentDidMount () {
    this.props.createGame(9, 9, 10)
  }
  handleResetClick = () => {
    this.props.createGame(9, 9, 10)
  }
  handleSquareMouseDown = coords => event => {
    this.setState({resetButtonClass: 'ResetButton--shocked'})
  }
  handleSquareMouseUp = coords => event => {
    this.setState({resetButtonClass: ''})
  }
  render () {
    let flagsAvailable = 0
    if (this.props.game.size.numMines) {
      flagsAvailable = this.props.game.size.numMines - this.props.game.flagsRaised
    }
    return (
      <div className='App'>
        <header className='App__header'>
          <FlagCounter flagsAvailable={flagsAvailable} />
          <ResetButton
            resetButtonClass={this.state.resetButtonClass}
            handleResetClick={this.handleResetClick}
          />
          <Timer timerActive={this.props.game.timerActive} />
        </header>
        <Board
          handleSquareMouseDown={this.handleSquareMouseDown}
          handleSquareMouseUp={this.handleSquareMouseUp}
        />
      </div>
    )
  }
}

function mapStateToProps ({ game }) {
  return { game }
}

export default connect(mapStateToProps, actions)(App)
