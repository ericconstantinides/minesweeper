import React, { Component } from 'react'
import { connect } from 'react-redux'

import FlagCounter from './components/FlagCounter'
import ResetButton from './components/ResetButton'
import Timer from './components/Timer'
import Board from './components/Board'

import * as actions from './actions'

class App extends Component {
  componentDidMount () {
    this.props.createGame(9, 9, 10)
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
          <ResetButton />
          <Timer timerActive={this.props.game.timerActive} />
        </header>
        <Board />
      </div>
    )
  }
}

function mapStateToProps ({ game }) {
  return { game }
}

export default connect(mapStateToProps, actions)(App)
