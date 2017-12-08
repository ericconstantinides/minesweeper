import { UI_TOGGLE_MODAL } from './types'

export function toggleUiModal (newModalActive) {
  return {
    type: UI_TOGGLE_MODAL,
    payload: newModalActive
  }
}
