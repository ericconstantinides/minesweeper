import { UI_TOGGLE_MODAL } from './types'
/**
 * Turns the Modal on and off
 *
 * @export
 * @param {boolean} isActive
 * @returns {object} UI_TOGGLE_MODAL
 */
export function showUiModal (isActive) {
  return {
    type: UI_TOGGLE_MODAL,
    payload: isActive
  }
}
