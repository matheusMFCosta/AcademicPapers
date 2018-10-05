import { combineReducers } from 'redux'
import { containerReducerState } from '../../types'

const containerReducerInitialState: containerReducerState = {
  activeTab: 'materiais',
  materias: {}
}

export const containerReducer = (state: containerReducerState = containerReducerInitialState, action) => {
  if (action.containerReducer) {
    return action.containerReducer(state)
  }
  return state
}

const rootReducer = combineReducers({
  containerReducer
})

export default rootReducer
