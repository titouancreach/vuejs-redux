import { createStore, combineReducers } from 'redux'

import { counter } from './Reducers/Counter'
import { counter2 } from './Reducers/Counter_second'
const rootReducerSample = combineReducers({
  counter,
  counter2,
})

const store = createStore(rootReducerSample)
export default store
