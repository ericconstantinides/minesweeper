import React, { Component } from 'react'
import { connect } from 'react-redux'

import FlagCounter from './components/FlagCounter'
import ResetButton from './components/ResetButton'
import Timer from './components/Timer'
import Board from './components/Board'
import Modal from './components/Modal'
import Instructions from './components/Instructions'

import * as actions from './actions'

class App extends Component {
  state = {
    resetButtonClass: ''
  }
  componentDidMount () {
    this.props.createGame()
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.game.status === 'won') {
      this.setState({ resetButtonClass: 'ResetButton--win' })
    } else if (nextProps.game.status === 'lost') {
      this.setState({ resetButtonClass: 'ResetButton--lost' })
    } else {
      this.setState({ resetButtonClass: '' })
    }
  }
  handleResetClick = () => {
    const { width, height, numMines } = this.props.game.settings
    this.props.createGame(width, height, numMines)
  }
  handleSquareMouseDown = coords => event => {
    const { status, board } = this.props.game
    if (
      board[coords.x][coords.y].isSwept ||
      board[coords.x][coords.y].isFlag ||
      (status !== 'playing' && status !== 'ready')
    ) {
      return
    }
    this.setState({ resetButtonClass: 'ResetButton--shocked' })
  }
  handleSquareMouseUp = coords => event => {
    const { status, board } = this.props.game
    if (
      board[coords.x][coords.y].isSwept ||
      board[coords.x][coords.y].isFlag ||
      (status !== 'playing' && status !== 'ready')
    ) {
      return
    }
    this.setState({ resetButtonClass: '' })
  }
  handleModalClick = event => {
    // don't close the modal if the outside modal is not what you clicked:
    if (
      event.currentTarget.className === 'Modal' &&
      event.target.className !== 'Modal'
    ) {
      return
    }
    this.props.showUiModal(!this.props.ui.modalActive)
  }
  render () {
    let flagsAvailable = 0
    if (this.props.game.settings.numMines) {
      flagsAvailable =
        this.props.game.settings.numMines - this.props.game.flagsRaised
    }
    return (
      <div className='App__container'>
        <div className={`App App--${this.props.game.status}`}>
          <header className='App__header'>
            <FlagCounter flagsAvailable={flagsAvailable} />
            <ResetButton
              resetButtonClass={this.state.resetButtonClass}
              handleResetClick={this.handleResetClick}
            />
            <Timer status={this.props.game.status} />
          </header>
          <Board
            handleSquareMouseDown={this.handleSquareMouseDown}
            handleSquareMouseUp={this.handleSquareMouseUp}
          />
        </div>
        <div className='modal__button-container'>
          <button onClick={this.handleModalClick} className='modal__button'>
            Game Settings
          </button>
        </div>
        <Instructions />
        {this.props.ui.modalActive &&
          <Modal handleModalClick={this.handleModalClick} />}
      </div>
    )
  }
}

function mapStateToProps ({ game, ui }) {
  return { game, ui }
}

export default connect(mapStateToProps, actions)(App)
