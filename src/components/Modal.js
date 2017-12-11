import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import settings from '../config'

class Modal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      width: this.props.game.settings.width,
      height: this.props.game.settings.height,
      numMines: this.props.game.settings.numMines
    }
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
    const maxMines = Math.floor(
      this.state.width * this.state.height / settings.maxMineRatio
    )
    if (this.state.numMines > maxMines) {
      this.setState({ numMines: maxMines })
    }
  }
  handleModalSettings = (settings) => {
    this.setState(settings)
  }
  handleSaveSettings = event => {
    // I need to update the settings here:
    this.props.showUiModal(false)
    this.props.createGame(
      this.state.width,
      this.state.height,
      this.state.numMines
    )
  }
  render () {
    return (
      <div className='Modal' onClick={this.props.handleModalClick}>
        <div className='Modal__inner'>
          <h2>MineSweeper Game Settings</h2>
          <article className='form__item'>
            <button
              onClick={() => this.handleModalSettings(settings.beginner)}
              className='modal__button no-border'
            >
              Set Beginner
            </button>
            <button
              onClick={() => this.handleModalSettings(settings.intermediate)}
              className='modal__button no-border'
            >
              Set Intermediate
            </button>
            <button
              onClick={() => this.handleModalSettings(settings.expert)}
              className='modal__button no-border'
            >
              Set Expert
            </button>
          </article>
          <article className='form__item'>
            <label className='form__label'>Width</label>
            <input
              className='form__input-slider'
              type='range'
              min={settings.minWidth}
              max={settings.maxWidth}
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
              min={settings.minHeight}
              max={settings.maxHeight}
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
              max={Math.floor(this.state.width * this.state.height / settings.maxMineRatio)}
              value={this.state.numMines}
              step='1'
              id='numMines'
              onChange={this.handleMinesChange}
            />
            <output className='form__output'>{this.state.numMines}</output>
          </article>
          <button onClick={this.handleSaveSettings} className='modal__button'>
            Start New Game
          </button>
          <button onClick={this.props.handleModalClick} className='modal__button'>
            Cancel
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
