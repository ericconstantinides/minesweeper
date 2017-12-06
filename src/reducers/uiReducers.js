import { UI_SHOW_MODAL } from '../actions/types'

const initialState = {
  modalActive: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case UI_SHOW_MODAL:
      return { ...state, modalActive: true }
    default:
  }
  return state
}
