import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Modal extends Component {
  state = {
    width: this.props.game.size.width,
    height: this.props.game.size.height,
    mines: this.props.game.size.numMines
  }
  handleWidthChange = event => {
    this.setState({width: event.target.value})
  }
  handleHeightChange = event => {
    this.setState({height: event.target.value})
  }
  handleMinesChange = event => {
    this.setState({mines: event.target.value})
  }
  handleSaveSettings = event => {
    // I need to update the settings here:
    console.log('save settings')
  }
  render () {
    return (
      <div className='Modal' onClick={this.props.handleModalClick}>
        <div className='Modal__inner'>
          <h2>MineSweeper Game Settings</h2>
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
              max={this.state.width * this.state.height - 1}
              value={this.state.mines}
              step='1'
              id='mines'
              onChange={this.handleMinesChange}
            />
            <output className='form__output'>{this.state.mines}</output>
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
