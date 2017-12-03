import React, { Component } from 'react'
import MineCounter from './components/MineCounter'
import ResetButton from './components/ResetButton'
import Timer from './components/Timer'
import Board from './components/Board'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App__header'>
          <MineCounter />
          <ResetButton />
          <Timer />
        </header>
        <Board />
      </div>
    )
  }
}

export default App
