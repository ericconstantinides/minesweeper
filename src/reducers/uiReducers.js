import { UI_TOGGLE_MODAL } from '../actions/types'

const initialState = {
  modalActive: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case UI_TOGGLE_MODAL:
      return { ...state, modalActive: action.payload }
    default:
  }
  return state
}
