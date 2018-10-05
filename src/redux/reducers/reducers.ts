import { combineReducers } from 'redux'
import { containerReducerState } from '../../types'

export interface globalState {
  containerReducer: containerReducerState
}

const containerReducerInitialState: containerReducerState = {
  searchParams: {
    Query: 'teste',
    ContentTypeIds: '%5B%5',
    D: 1,
    PageNumber: 0,
    PageSize: 20,
    Order: 2
  },
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
