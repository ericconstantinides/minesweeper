import { combineReducers } from 'redux'

// import uiReducers from './uiReducers'
import gameReducers from './gameReducers'

const rootReducer = combineReducers({
  // ui: uiReducers,
  game: gameReducers
})

export default rootReducer
