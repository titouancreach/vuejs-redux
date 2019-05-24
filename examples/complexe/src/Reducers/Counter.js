import { INCREMENT, DECREMENT, RESET } from '../Actions/types'

export function counter(state = { count: 0, count2: 19 }, action) {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + state.count2, count2: state.count2 }
    case DECREMENT:
      return { count: state.count - 1, count2: state.count2 }
    case RESET:
      return { count: action.count3, count2: state.count2 }
    default:
      return state
  }
}
