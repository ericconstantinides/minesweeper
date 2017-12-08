import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Modal extends Component {
  state = {
    width: this.props.game.size.width,
    height: this.props.game.size.height,
    numMines: this.props.game.size.numMines
  }
  handleWidthChange = event => {
    this.setState({ width: event.target.value })
    this.updateMaxMines()
  }
  handleHeightChange = event => {
    this.setState({ height: event.target.value })
    this.updateMaxMines()
  }
  handleMinesChange = event => {
    this.setState({ numMines: event.target.value })
  }
  updateMaxMines = () => {
    const maxMines = Math.floor(this.state.width * this.state.height / 2)
    if (this.state.numMines > maxMines) {
      this.setState({numMines: maxMines})
    }
  }
  handleModalSettings = (width, height, numMines) => {
    // console.log('hello')
    this.setState({width, height, numMines})
  }
  handleSaveSettings = event => {
    // I need to update the settings here:
    this.props.toggleUiModal(false)
    this.props.createGame(this.state.width, this.state.height, this.state.numMines)
  }
  render () {
    return (
      <div className='Modal' onClick={this.props.handleModalClick}>
        <div className='Modal__inner'>
          <h2>MineSweeper Game Settings</h2>
          <button
            onClick={() => this.handleModalSettings(9, 9, 10)}
            className='modal__button'
          >
            Beginner
          </button>
          <button
            onClick={() => this.handleModalSettings(16, 16, 40)}
            className='modal__button'
          >
            Intermediate
          </button>
          <button
            onClick={() => this.handleModalSettings(30, 16, 99)}
            className='modal__button'
          >
            Expert
          </button>
          <article className='form__item'>
            <label className='form__label'>Width</label>
            <input
              className='form__input-slider'
              type='range'
              min='6'
              max='40'
              value={this.state.width}
              step='1'
              id='width'
              onChange={this.handleWidthChange}
            />
            <output className='form__output'>{this.state.width}</output>
          </article>
          <article className='form__item'>
            <label className='form__label'>Height</label>
            <input
              className='form__input-slider'
              type='range'
              min='6'
              max='40'
              value={this.state.height}
              step='1'
              id='height'
              onChange={this.handleHeightChange}
            />
            <output className='form__output'>{this.state.height}</output>
          </article>
          <article className='form__item'>
            <label className='form__label'>Mines</label>
            <input
              className='form__input-slider'
              type='range'
              min='1'
              max={Math.floor(this.state.width * this.state.height / 2)}
              value={this.state.numMines}
              step='1'
              id='numMines'
              onChange={this.handleMinesChange}
            />
            <output className='form__output'>{this.state.numMines}</output>
          </article>
          <button onClick={this.handleSaveSettings} className='modal__button'>
            Save Settings
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ game }) {
  return { game }
}

export default connect(mapStateToProps, actions)(Modal)
