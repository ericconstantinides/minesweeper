import _ from 'lodash'
import {
  GAME_CREATE,
  GAME_START,
  GAME_UPDATE_FLAGS,
  GAME_WIN,
  GAME_LOSE,
  GAME_SWEEP
} from '../actions/types'

const initialState = {
  mines: {},
  board: [],
  settings: {},
  squaresSwept: 0,
  flagsRaised: 0,
  explosionCoords: false,
  status: 'ready'
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GAME_CREATE:
      const { mines, board, settings } = action.payload
      return { ...initialState, mines: { ...mines }, board, settings }
    case GAME_START:
      return { ...state, status: 'playing' }
    case GAME_UPDATE_FLAGS:
      return {
        ...state,
        board: _.cloneDeep(action.payload.board),
        flagsRaised: action.payload.flagsRaised
      }
    case GAME_WIN:
      return {
        ...state,
        status: 'won',
        board: _.cloneDeep(action.payload.board),
        squaresSwept: action.payload.squaresSwept,
        flagsRaised: action.payload.flagsRaised
      }
    case GAME_LOSE:
      const { explosionCoords } = action.payload
      return {
        ...state,
        status: 'lost',
        board: _.cloneDeep(action.payload.board),
        explosionCoords
      }
    case GAME_SWEEP:
      const { sweptBoard, squaresSwept } = action.payload
      return {
        ...state,
        board: _.cloneDeep(sweptBoard),
        squaresSwept
      }
    default:
  }
  return state
}
