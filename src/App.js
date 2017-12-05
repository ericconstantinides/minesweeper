import React, { Component } from 'react'
import FlagCounter from './components/FlagCounter'
import ResetButton from './components/ResetButton'
import Timer from './components/Timer'
import Board from './components/Board'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App__header'>
          <FlagCounter />
          <ResetButton />
          <Timer />
        </header>
        <Board />
      </div>
    )
  }
}

export default App
