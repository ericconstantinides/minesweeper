import { GAME_CREATE } from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case GAME_CREATE:
      const { mines, board } = action.payload
      return { ...state, mines, board }
    default:
  }
  return state
}
