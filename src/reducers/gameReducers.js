import { GAME_CREATE, GAME_LOSE, GAME_SWEEP } from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case GAME_CREATE:
      const { mines, board } = action.payload
      return { ...state, mines, board }
    case GAME_LOSE:
      return { ...state }
    case GAME_SWEEP:
      return { ...state, board: action.payload }
    default:
  }
  return state
}
