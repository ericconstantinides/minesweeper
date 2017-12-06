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
    this.props.createGame(9, 9, 5)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.game.status === 'won') {
      this.setState({resetButtonClass: 'ResetButton--win'})
    } else if (nextProps.game.status === 'lost') {
      this.setState({resetButtonClass: 'ResetButton--lost'})
    } else {
      this.setState({resetButtonClass: ''})
    }
  }
  handleResetClick = () => {
    this.props.createGame(9, 9, 10)
  }
  handleSquareMouseDown = coords => event => {
    if (this.props.game.status !== 'playing') return
    this.setState({resetButtonClass: 'ResetButton--shocked'})
  }
  handleSquareMouseUp = coords => event => {
    if (this.props.game.status !== 'playing') return
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
