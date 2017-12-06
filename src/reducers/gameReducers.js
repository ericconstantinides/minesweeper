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
  size: {},
  timerActive: false,
  squaresSwept: 0,
  flagsRaised: 0,
  isWon: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GAME_CREATE:
      const { mines, board, size } = action.payload
      return { ...initialState, mines, board, size }
    case GAME_START:
      return { ...state, timerActive: true }
    case GAME_UPDATE_FLAGS:
      return {
        ...state,
        board: action.payload.board,
        flagsRaised: action.payload.flagsRaised
      }
    case GAME_WIN:
      return {
        ...state,
        isWon: true,
        board: action.payload.board,
        squaresSwept: action.payload.squaresSwept,
        flagsRaised: action.payload.flagsRaised
      }
    case GAME_LOSE:
      return initialState
    case GAME_SWEEP:
      const { sweptBoard, squaresSwept } = action.payload
      return { ...state, board: sweptBoard, squaresSwept }
    default:
  }
  return state
}
